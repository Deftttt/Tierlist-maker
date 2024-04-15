package com.example.loginapi2.repository;

import com.example.loginapi2.model.Tier;
import com.example.loginapi2.model.TierList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TierRepository extends JpaRepository<Tier, Long> {
}
