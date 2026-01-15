package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(exclude = { org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration.class,
		org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration.class })
@SpringBootTest
class DemoApplicationTests {

	@Test
	void contextLoads() {
	}

}
