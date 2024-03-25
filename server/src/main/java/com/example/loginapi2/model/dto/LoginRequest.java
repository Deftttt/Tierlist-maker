package com.example.loginapi2.model.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
