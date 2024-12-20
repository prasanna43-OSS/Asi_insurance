package com.example.insurance_portal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.insurance_portal.model.Policy;
import com.example.insurance_portal.repository.PolicyRepository;

@Service
public class PolicyService {
    @Autowired
    private PolicyRepository repository;

    public List<Policy> getAllPolicies() {
        return repository.findAll();
    }

    public Policy addPolicy(Policy policy) {
        return repository.save(policy);
    }
}