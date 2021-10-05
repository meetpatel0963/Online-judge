package com.onlinejudge.model;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Document(collection="users")
@NoArgsConstructor
@Data
@Getter 
@Setter
public class User {
    @Id
    private String id; 

    @Field("firstName")
    private String firstName;
    
    @Field("username")
    private String username;
    
    @Field("lastName")
    private String lastName;
    
    @Field("email")
    private String email;
    
    @Field("contact")
    private String contact;
    
    @Field("country")
    private String country;
    
    @Field("password")
    private String password;

    @Field("description")
    private String description;
    
    @Field("date")
    private String date;
    
    @Field("stats")
    private Map<String, ?> stats;
    
	public User(String firstName, String lastName, String username, String email, 
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
		
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
	    Date date = new Date();  
		this.date = formatter.format(date);
	}
	
}
