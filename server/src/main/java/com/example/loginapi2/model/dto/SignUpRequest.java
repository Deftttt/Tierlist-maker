package com.example.loginapi2.model.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
@Data
public class SignUpRequest {
    @Email(message = "Niepoprawny adres email")
    @NotBlank(message = "Pole nie może być puste")
    private String email;

    @NotBlank(message = "Pole nie może być puste")
    @Size(min = 6, max = 30, message = "Hasło użytkownika musi mieć 6-30 znaków")
    private String password;

    @NotBlank(message = "Pole nie może być puste")
    @Size(min = 6, max = 30, message = "Hasło użytkownika musi mieć 6-30 znaków")
    private String passwordConfirm;

    @NotBlank(message = "Pole nie może być puste")
    @Size(max = 100, message = "Przekroczono max. długość (100 znaków)")
    private String extraAtribute;
}
