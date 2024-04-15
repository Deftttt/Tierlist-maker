package com.example.loginapi2.model.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TierDto {
    @NotBlank(message = "Pole nie może być puste")
    @Size(max = 40, message = "Przekroczono max. długość (40 znaków)")
    private String name;
}
