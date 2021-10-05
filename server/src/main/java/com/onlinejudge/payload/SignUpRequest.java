package com.onlinejudge.payload;

import java.util.Map;

import com.onlinejudge.model.User;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Data
@Getter 
@Setter
public class SignUpRequest {
	
    private String firstName;
    
    private String lastName;
    
    private String username;
    
    private String email;
    
    private String contact;
    
    private String country;
    
    private String password;

    private String description;
    
    private Map<String, ?> stats;
    
	public SignUpRequest(String firstName, String lastName, String username, String email, 
			String contact, String country, 
			String password, String description, Map<String, ?> stats) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.email = email;
		this.contact = contact;
		this.country = country;
		this.password = password;
		this.description = description;
		this.stats = stats;
	}
	
}

