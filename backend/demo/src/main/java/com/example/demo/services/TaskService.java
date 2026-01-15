package com.example.demo.services;

import java.time.DayOfWeek;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.List;

import org.bson.Document;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.FacetOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.DTOs.response.TaskResponseDTO;
import com.example.demo.models.Task;
import com.example.demo.repositories.TaskRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskService {
	private final TaskRepository taskRepository;
	private final MongoTemplate mongoTemplate;

	public TaskResponseDTO getAllTasks(String filter) {
		filter = filter == null ? "today" : filter;
		Instant startDate = null;
		switch (filter) {
		case "today" -> startDate = LocalDate.now(ZoneOffset.UTC).atStartOfDay(ZoneOffset.UTC).toInstant();
		case "week" -> startDate = LocalDate.now(ZoneOffset.UTC).with(DayOfWeek.MONDAY).atStartOfDay(ZoneOffset.UTC)
				.toInstant();
		case "month" -> startDate = LocalDate.now(ZoneOffset.UTC).withDayOfMonth(1).atStartOfDay(ZoneOffset.UTC)
				.toInstant();
		case "all" -> {
		}
		default -> startDate = null;

		}

		FacetOperation nonFilterQuery = Aggregation
				.facet(Aggregation.sort(Sort.Direction.DESC, "createdAt"),
						Aggregation.project().andExpression("toString(_id)").as("_id").andInclude("name", "status", "createdAt",
								"updatedAt", "completedAt"))
				.as("tasks").and(Aggregation.match(Criteria.where("status").is("ACTIVE")), Aggregation.count().as("count"))
				.as("activeCount")
				.and(Aggregation.match(Criteria.where("status").is("COMPLETE")), Aggregation.count().as("count"))
				.as("completeCount");

		Aggregation aggregation = (startDate != null)
				? Aggregation.newAggregation(Aggregation.match(Criteria.where("createdAt").gte(startDate)), nonFilterQuery)
				: Aggregation.newAggregation(nonFilterQuery);

		AggregationResults<Document> results = mongoTemplate.aggregate(aggregation, "task", Document.class);

		Document result = results.getUniqueMappedResult();
		List<Task> tasks = (List<Task>) result.get("tasks");
		List<Document> activeList = (List<Document>) result.get("activeCount");
		@SuppressWarnings("unchecked")
		Integer activeCount = activeList.isEmpty() ? 0 : activeList.get(0).getInteger("count");
		List<Document> completeList = (List<Document>) result.get("completeCount");
		TaskResponseDTO taskResponseDTO = new TaskResponseDTO();
		taskResponseDTO.setActiveCount(activeCount);
		taskResponseDTO.setCompleteCount(completeList.isEmpty() ? 0 : completeList.get(0).getInteger("count"));
		taskResponseDTO.setTasks(tasks);

		return taskResponseDTO;
	}

	@SuppressWarnings("null")
	public Task createTask(Task task) {

		return taskRepository.save(task);
	}

	public Task updateTask(String id, Task taskDetails) {
		@SuppressWarnings("null")
		Task existingTask = taskRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
		if (taskDetails.getName() != null)
			existingTask.setName(taskDetails.getName());

		existingTask.setStatus(taskDetails.getStatus());
		existingTask.setCompletedAt(taskDetails.getCompletedAt());
		return taskRepository.save(existingTask);
	}

	@SuppressWarnings("null")
	public void deleteTask(String id) {
		Task existingTask = taskRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
		taskRepository.delete(existingTask);
	}
}
