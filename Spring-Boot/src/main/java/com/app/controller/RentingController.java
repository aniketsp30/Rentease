package com.app.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entity.Products;
import com.app.entity.Renting;
import com.app.entity.User;
import com.app.repository.ProductsRepository;
import com.app.repository.RentingRepository;
import com.app.repository.UserRepository;

@RestController
@RequestMapping("/api/renting")
public class RentingController {

    @Autowired
    private RentingRepository rentingRepository;

    @Autowired
    private ProductsRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/rent")
    public ResponseEntity<?> rentProduct(@RequestBody Renting request) {
    	if (request.getProduct() == null ) {
            return ResponseEntity.badRequest().body("Product information is missing");
        }
    	Products product = productRepository.findById(request.getProduct().getId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        User user = userRepository.findById(request.getUser().getUid())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        System.out.println("Rent DateTime: " + request.getRentDate());
        System.out.println("Return DateTime: " + request.getReturnDate());
        if (request.getRentDate() == null) {
            return ResponseEntity.badRequest().body("Rent date is required.");
        }
        

        Renting renting = new Renting();
        renting.setProduct(product);
        renting.setUser(user);
        renting.setRentDate(request.getRentDate());
        renting.setReturnDate(request.getReturnDate());
        renting.setStatus("REQUEST");

        rentingRepository.save(renting);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Product Request sent successfully");
        return ResponseEntity.ok(response);    
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Renting>> getRentRequestsByUser(@PathVariable Long userId) {
        List<Renting> requests = rentingRepository.findByUserIdWithPayment(userId);
        return ResponseEntity.ok(requests);
    }

    
}
