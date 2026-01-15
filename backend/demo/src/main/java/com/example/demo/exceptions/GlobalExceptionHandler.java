package com.example.demo.exceptions;

import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.demo.DTOs.response.ErrorResponseDTO;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ErrorResponseDTO> handleResourceNotFoundException(ResourceNotFoundException e) {
		ErrorResponseDTO error = new ErrorResponseDTO();
		error.setStatus(404);
		error.setErrorCode("NOT_FOUND");
		error.setMessage(e.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
	}

}
