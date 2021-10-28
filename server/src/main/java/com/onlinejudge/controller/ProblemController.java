package com.onlinejudge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.onlinejudge.exception.ResourceNotFoundException;
import com.onlinejudge.model.Problem;
import com.onlinejudge.repository.ProblemRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/problem")
@RequiredArgsConstructor
public class ProblemController {
	
	@Autowired
	private ProblemRepository problemRepository;
	
	@GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Problem> findAll() {
        return problemRepository.findAll();
    }
	
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createProblem(@RequestBody Problem problem) {
        problemRepository.save(problem);
    }
    
    @GetMapping("/{id}")
	public Problem getProblemById(@PathVariable(value = "id") String problemId) {
	    return problemRepository.findById(problemId)
	            .orElseThrow(() -> new ResourceNotFoundException("Problem", "id", problemId));
	}

    @GetMapping("/name/{name}")
    public Problem getProblemByName(@PathVariable(value = "name") String problemName) {
        return problemRepository.findByName(problemName)
                .orElseThrow(() -> new ResourceNotFoundException("Problem", "name", problemName));
    }
}
