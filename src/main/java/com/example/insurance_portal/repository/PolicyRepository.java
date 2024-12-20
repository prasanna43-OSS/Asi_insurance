package com.example.insurance_portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.insurance_portal.model.Policy;

public interface PolicyRepository extends JpaRepository<Policy, Long> {
}