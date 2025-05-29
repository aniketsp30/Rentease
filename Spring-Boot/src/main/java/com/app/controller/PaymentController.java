package com.app.controller;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entity.Payment;
import com.app.entity.Products;
import com.app.entity.Renting;
import com.app.entity.User;
import com.app.repository.PaymentRepository;
import com.app.repository.ProductsRepository;
import com.app.repository.RentingRepository;
import com.app.repository.UserRepository;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins="http://localhost:4200")
public class PaymentController {

	@Autowired
    private PaymentRepository paymentRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ProductsRepository productRepo;

    @Autowired
    private RentingRepository rentingRepo;
    
    @PostMapping("/save")
    public ResponseEntity<String> savePayment(@RequestBody Payment payment) {
        if (payment.getUser() == null || payment.getProduct() == null || payment.getRenting() == null) {
            return ResponseEntity.badRequest().body("Invalid Payment Request: user, product, or renting info is missing!");
        }

        Optional<User> userOpt = userRepo.findById(payment.getUser().getUid());
        Optional<Products> productOpt = productRepo.findById(payment.getProduct().getId());
        Optional<Renting> rentingOpt = rentingRepo.findById(payment.getRenting().getId());

        if (userOpt.isPresent() && productOpt.isPresent() && rentingOpt.isPresent()) {
            payment.setUser(userOpt.get());
            payment.setProduct(productOpt.get());
            Renting renting = rentingOpt.get();
            payment.setRenting(renting);
            payment.setPaymentDate(LocalDateTime.now());

            // Save payment
            paymentRepo.save(payment);
            renting.setStatus("PAID");
            rentingRepo.save(renting);

            return ResponseEntity.ok("Payment saved successfully and rent marked as PAID.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User, Product, or Renting not found!");
        }
    }
    @PostMapping("/cancel")
    public ResponseEntity<String> CancelPayment(@RequestBody Payment payment) {
        	Optional<Renting> rentingOpt = rentingRepo.findById(payment.getRenting().getId());
        	Renting renting = rentingOpt.get();
    		renting.setStatus("UNPAID");
            rentingRepo.save(renting);

            return ResponseEntity.ok("Payment  Unsuccessfully and rent marked as UNPAID.");
    }

}
