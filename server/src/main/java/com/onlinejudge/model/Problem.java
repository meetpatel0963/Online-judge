package com.onlinejudge.model;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Document(collection="problems")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Getter 
@Setter
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
	
	@Field("sampleTestcases")
	private ArrayList<Map<String, ?>> sampleTestcases;
	
	@Field("systemTestcases")
	private ArrayList<Map<String, ?>> systemTestcases;
	
	@Field("time")
	private int time;
	
	@Field("memory")
	private int memory;
	
}
