package com.example.loginapi2.model.dto;

import com.example.loginapi2.model.Tier;
import lombok.Data;
import java.util.List;

@Data
public class TierListDto {
    private String name;
    private List<Tier> tiers;
}