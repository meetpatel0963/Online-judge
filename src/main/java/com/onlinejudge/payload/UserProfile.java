package com.onlinejudge.payload;


public class UserProfile {
    private String id;
    private String username;
    private String email;
    private String date;
	
    public UserProfile() {
	
    }
    
    public UserProfile(String id, String username, String email, String date) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.date = date;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}
	
}
