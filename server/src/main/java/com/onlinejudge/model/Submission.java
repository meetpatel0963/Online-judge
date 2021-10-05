package com.onlinejudge.model;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Document(collection="submissions")
@NoArgsConstructor
@Data
@Getter 
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class Submission {
	
	@Id
	private String id;
	
	@Field("problemName")
	private String problemName;
	
	@Field("code")
	private String code;
	
	@Field("language")
	private String language;
	
	@Field("userId")
	private String userId;
	
	@Field("verdict")
	private String verdict;
	
	@Field("date")
	private String date;
	
	@Field("result")
	private ArrayList<Map<String, ?>> result;

	public Submission(String id, String problemName, String code, String language, 
						String userId, String verdict, ArrayList<Map<String, ?>> result) {
		this.id = id;
		this.problemName = problemName;
		this.code = code;
		this.language = language;
		this.userId = userId;
		this.verdict = verdict;
		this.result = result;
		
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
	    Date date = new Date();  
		this.date = formatter.format(date);
	}
	
}
