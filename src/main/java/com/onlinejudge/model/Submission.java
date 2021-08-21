package com.onlinejudge.model;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Document(collection="submissions")
@NoArgsConstructor
@Builder
@Data
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

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getProblemName() {
		return problemName;
	}

	public void setProblemName(String problemName) {
		this.problemName = problemName;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getVerdict() {
		return verdict;
	}

	public void setVerdict(String verdict) {
		this.verdict = verdict;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public ArrayList<Map<String, ?>> getResult() {
		return result;
	}

	public void setResult(ArrayList<Map<String, ?>> result) {
		this.result = result;
	}
	
}
