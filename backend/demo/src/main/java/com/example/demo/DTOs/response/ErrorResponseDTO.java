package com.example.demo.DTOs.response;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ErrorResponseDTO {
	private boolean success = false;
	private int status;
	private String errorCode;
	private String message;
	private Object details;
	private LocalDateTime timestamp = LocalDateTime.now();

}
