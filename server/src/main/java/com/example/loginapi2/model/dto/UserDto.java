package com.example.loginapi2.model.dto;

import com.example.loginapi2.model.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDto {
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
    private String extraAtribute;

}
