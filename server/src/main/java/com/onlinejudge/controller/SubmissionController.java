package com.onlinejudge.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.onlinejudge.exception.ResourceNotFoundException;
import com.onlinejudge.model.Submission;
import com.onlinejudge.repository.SubmissionRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/submission")
@RequiredArgsConstructor
public class SubmissionController {
	
	@Autowired
	private SubmissionRepository submissionRepository;
	
	@GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Submission> findAll() {
        return submissionRepository.findAll();
    }
	
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createSubmission(@RequestBody Submission submission) {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = new Date();
		submission.setDate(formatter.format(date));
		submissionRepository.save(submission);
    }
    
    @GetMapping("/{id}")
	public Submission getSubmissionById(@PathVariable(value = "id") String submissionId) {
	    return submissionRepository.findById(submissionId)
	            .orElseThrow(() -> new ResourceNotFoundException("Submission", "id", submissionId));
	}
	
    @GetMapping("/user/{id}")
	public List<Submission> getSubmissionByUserId(@PathVariable(value = "id") String userId) {
	    return submissionRepository.findByUserId(userId);
	}
    
    @GetMapping("/user/{id}/{verdict}")
	public List<Submission> getSubmissionByUserIdAndVerdict(@PathVariable(value = "id") String userId, @PathVariable(value = "verdict") String verdict) {
	    return submissionRepository.findByUserIdAndVerdict(userId, verdict);
	}
}
