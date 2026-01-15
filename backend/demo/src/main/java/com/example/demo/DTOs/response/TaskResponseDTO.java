package com.example.demo.DTOs.response;

import java.util.List;

import com.example.demo.models.Task;

import lombok.Data;

@Data
public class TaskResponseDTO {
	private int activeCount;
	private int completeCount;
	private List<Task> tasks;
}
