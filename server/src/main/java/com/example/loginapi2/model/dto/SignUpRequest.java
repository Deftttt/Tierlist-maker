package com.example.loginapi2.model.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
@Data
public class SignUpRequest {
    @NotBlank(message = "Pole nie może być puste")
    @Size(min = 6, max = 30, message = "Nazwa użytkownika musi mieć 6-30 znaków")
    private String email;

    @NotBlank(message = "Pole nie może być puste")
    @Size(min = 6, max = 30, message = "Hasło użytkownika musi mieć 6-30 znaków")
    private String password;

    @NotBlank(message = "Pole nie może być puste")
    @Size(min = 6, max = 30, message = "Hasło użytkownika musi mieć 6-30 znaków")
    private String passwordConfirm;

    @NotBlank(message = "Pole nie może być puste")
    @Size(max = 60, message = "Przekroczono max. długość (60 znaków)")
    private String extraAtribute;
}
