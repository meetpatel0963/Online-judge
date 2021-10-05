package com.onlinejudge.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.onlinejudge.model.User;


@Repository
public interface UserRepository extends MongoRepository<User, String> {
	Optional<User> findByEmail(String email);

    Optional<User> findByUsernameOrEmail(String username, String email);
    
    Optional<User> findByUsername(String username);
    
    List<User> findByIdIn(List<String> userIds);
    
    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}