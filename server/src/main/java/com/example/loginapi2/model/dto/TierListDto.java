package com.example.loginapi2.model.dto;

import com.example.loginapi2.model.Tier;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.util.List;

@Data
public class TierListDto {
    @NotBlank(message = "Pole nie może być puste")
    @Size(max=40, message = "Nazwa może mieć max. 40 znaków")
    private String name;

    private List<Tier> tiers;
}