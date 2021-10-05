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
public class LoginRequest {
    private String usernameOrEmail;

    private String password;

}

