package com.onlinejudge.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.onlinejudge.model.Problem;

import java.util.Optional;

@Repository
public interface ProblemRepository extends MongoRepository<Problem, String> {

    Optional<Problem> findByName(String problemName);
}
