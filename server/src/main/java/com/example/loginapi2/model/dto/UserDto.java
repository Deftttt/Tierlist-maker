package com.example.loginapi2.model.dto;

import com.example.loginapi2.model.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class UserDto {
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
    private String extraAtribute;
}
