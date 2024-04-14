package com.example.loginapi2.model.dto;

import com.example.loginapi2.model.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDto {
    @Email(message = "Niepoprawny adres email")
    @NotBlank(message = "Pole nie może być puste")
    private String email;

    @NotBlank(message = "Pole nie może być puste")
    @Size(min = 6, max = 30, message = "Hasło użytkownika musi mieć 6-30 znaków")
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @NotBlank(message = "Pole nie może być puste")
    @Size(max = 100, message = "Przekroczono max. długość (100 znaków)")
    private String extraAtribute;

}
