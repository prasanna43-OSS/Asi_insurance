package com.example.insurance_portal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.insurance_portal.model.Policy;
import com.example.insurance_portal.service.PolicyService;

@RestController
@RequestMapping("/api/policies")
public class PolicyController {
    @Autowired
    private PolicyService service;

    @GetMapping
    public List<Policy> getPolicies() {
        return service.getAllPolicies();
    }

    @PostMapping
    public Policy createPolicy(@RequestBody Policy policy) {
        return service.addPolicy(policy);
    }
}