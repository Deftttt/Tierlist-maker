package com.example.loginapi2.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Tier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "tier_id_seq")
    @SequenceGenerator(name = "tier_id_seq", allocationSize = 1, initialValue = 100)
    private Long tierId;

    private String name;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "tier_id")
    private List<Item> items;

    private boolean isPool = false;

}
