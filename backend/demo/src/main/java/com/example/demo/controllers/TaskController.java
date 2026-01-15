package com.example.demo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTOs.response.TaskResponseDTO;
import com.example.demo.models.Task;
import com.example.demo.services.TaskService;

@CrossOrigin("*")

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
	private final TaskService taskService;

	public TaskController(TaskService taskService) {
		this.taskService = taskService;
	}

	@GetMapping
	public ResponseEntity<TaskResponseDTO> getAllTasks(@RequestParam(name = "filter", required = false) String filter) {
		TaskResponseDTO tasks = taskService.getAllTasks(filter);
		return new ResponseEntity<>(tasks, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Task> createTask(@RequestBody Task task) {
		Task createTask = taskService.createTask(task);
		return new ResponseEntity<>(createTask, HttpStatus.CREATED);

	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateTask(@PathVariable String id, @RequestBody Task task) {
		Task updatedTask = taskService.updateTask(id, task);
		return new ResponseEntity<>(updatedTask, HttpStatus.ACCEPTED);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteTask(@PathVariable String id) {
		taskService.deleteTask(id);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(null);
	}

}
