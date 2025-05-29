package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.config.CustomerUserDetails;
import com.app.config.JwtUtil;
import com.app.entity.Admin;
import com.app.entity.User;
import com.app.payload.AuthRequest;
import com.app.payload.AuthResponse;
import com.app.payload.RegisterRequest;
import com.app.payload.UserRegisterRequest;
import com.app.repository.AdminRepository;
import com.app.repository.UserRepository;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private AdminRepository adminRepo;
    
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

        CustomerUserDetails userDetails = (CustomerUserDetails) authentication.getPrincipal();

        String token = jwtUtil.generateToken(userDetails);
        String role = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElse("ROLE_USER");

        return new AuthResponse(token, userDetails.getUsername(), role);
    }
    
    @PostMapping("/register-admin")
    public String registerAdmin(@RequestBody RegisterRequest request) {

        if(adminRepo.existsByUsername(request.getUsername())) {
            return "Username already taken!";
        }

        Admin admin = new Admin();
        admin.setUsername(request.getUsername());
        admin.setEmail(request.getEmail());
        // Encode the password before saving
        admin.setPassword(passwordEncoder.encode(request.getPassword()));

        adminRepo.save(admin);

        return "Admin registered successfully!";
    }

    @PostMapping("/register-user")
    public String registerUser(@RequestBody UserRegisterRequest request) {

        if(userRepo.existsByUsername(request.getUsername())) {
            return "Username already taken!";
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setUname(request.getName());
        user.setAddress(request.getAddress());
        user.setPhone(request.getPhone());
        // Encode the password before saving
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        

        userRepo.save(user);

        return "User registered successfully!";
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            

            return ResponseEntity.ok("User logged out successfully.");
        } else {
            return ResponseEntity.badRequest().body("Token not found.");
        }
    }
}
