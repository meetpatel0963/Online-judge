package com.onlinejudge.repository;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.onlinejudge.model.Submission;

@Repository
public interface SubmissionRepository extends MongoRepository<Submission, String> {
	
	List<Submission> findByUserId(String userId);
	
	List<Submission> findByUserIdAndVerdict(String userId, String verdict);
}

