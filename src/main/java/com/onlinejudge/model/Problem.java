package com.onlinejudge.model;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Document(collection="problems")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Problem {
	
	@Id
	private String id;
	
	@Field("tags")
	private ArrayList<String> tags;
	
	@Field("countAC")
	private int countAC;
	
	@Field("countTotal")
	private int countTotal;
	
	@Field("name")
	private String name;
	
	@Field("author")
	private String author;
	
	@Field("statement")
	private String statement;
	
	@Field("explanation")
	private String explanation;
	
	@Field("sampleTestcase")
	private ArrayList<Map<String, ?>> sampleTestcase;
	
	@Field("systemTestcase")
	private ArrayList<Map<String, ?>> systemTestcase;
	
	@Field("time")
	private int time;
	
	@Field("memory")
	private int memory;
	
}
