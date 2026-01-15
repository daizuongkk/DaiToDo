package com.example.demo.models;

import java.time.Instant;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;

@Document("task")
@Data
public class Task {

	@Id
	private String id;
	@Field("name")
	private String name;
	private TaskStatus status = TaskStatus.ACTIVE;

	@CreatedDate
	private Instant createdAt;
	@LastModifiedDate
	private Instant updatedAt;
	private Instant completedAt;
}
