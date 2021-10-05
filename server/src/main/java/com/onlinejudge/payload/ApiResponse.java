package com.onlinejudge.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter 
@Setter
public class ApiResponse {

	private Boolean success;
    private String message;

}

