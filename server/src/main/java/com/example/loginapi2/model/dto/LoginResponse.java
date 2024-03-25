package com.example.loginapi2.model.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
public class LoginResponse {
    private String accessToken;
}
