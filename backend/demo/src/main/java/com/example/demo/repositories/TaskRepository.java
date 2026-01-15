package com.example.demo.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Task;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {
}
