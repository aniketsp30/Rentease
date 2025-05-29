package com.app.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entity.Renting;
import com.app.repository.RentingRepository;

@RestController
@RequestMapping("/api/admin")
public class adminController {
	    @Autowired
	    private RentingRepository rentingRepository;

	    // Get all rent requests
	    @GetMapping("/rent-requests")
	    public ResponseEntity<?> getAllRentRequests() {
	        return ResponseEntity.ok(rentingRepository.findAll());
	    }

	    // Approve a rent request
	    @PutMapping("/rent-requests/{id}/approve")
	    public ResponseEntity<Map<String, String>> approveRequest(@PathVariable Long id) {
	        Renting rent = rentingRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Request not found"));
	        rent.setStatus("APPROVED");
	        rentingRepository.save(rent);
	        Map<String, String> response = new HashMap<>();
	        response.put("message", "Approved");
	        return ResponseEntity.ok(response);	    }

	    // Reject a rent request
	    @PutMapping("/rent-requests/{id}/reject")
	    public ResponseEntity<Map<String, String>> rejectRequest(@PathVariable Long id) {
	        Renting rent = rentingRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Request not found"));
	        rent.setStatus("REJECTED");
	        rentingRepository.save(rent);
	        Map<String, String> response = new HashMap<>();
	        response.put("message", "Approved");
	        return ResponseEntity.ok(response);	    }
	

}
