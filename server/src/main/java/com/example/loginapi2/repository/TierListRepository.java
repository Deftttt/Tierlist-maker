package com.example.loginapi2.repository;

import com.example.loginapi2.model.TierList;
import com.example.loginapi2.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TierListRepository extends JpaRepository<TierList, Long> {
    List<TierList> findAllByUserId(Long userId);
}
