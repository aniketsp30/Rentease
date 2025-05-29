package com.app.controller;



import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.app.config.JwtUtil;
import com.app.entity.User;
import com.app.repository.UserRepository;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class UserController {
	
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
	private JwtUtil jwtUtil;
    
	@GetMapping("/user")
	public List<User> getAllUser(){
		return userRepository.findAll();
		
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/user")
	public ResponseEntity<Map<String,String>> createUser(@RequestBody User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User Register successfully.");
        return ResponseEntity.ok(response);
        
	}
	
	@GetMapping("/user/{id}")
	public ResponseEntity<User> getUserById(@PathVariable long id) {
		User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
		    return ResponseEntity.ok(user);	
	}
	
	@PutMapping("/user/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Long id,@RequestBody User userDetail){
		User user = userRepository.findById(id)
		        .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
		user.setUname(userDetail.getUname());
		user.setUsername(userDetail.getUsername());
		user.setPhone(userDetail.getPhone());
		user.setAddress(userDetail.getAddress());
		if (userDetail.getPassword() != null && !userDetail.getPassword().isEmpty()) {
		    user.setPassword(passwordEncoder.encode(userDetail.getPassword()));
		}
		
		User updateuser =userRepository.save(user);
		return ResponseEntity.ok(updateuser);
	}
	
	@DeleteMapping("/user/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable Long id) {
		User user = userRepository.findById(id)
		        .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));	
		userRepository.delete(user);
	    Map<String,Boolean> res=new HashMap<>();
	    res.put("delete", Boolean.TRUE);
	    return ResponseEntity.ok(res);
	} 
	
	@GetMapping("/user/profile")
    public ResponseEntity<User> getProfile(@RequestHeader("Authorization") String authHeader) {
        // Authorization header format: "Bearer <token>"
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).build();
        }

        String token = authHeader.substring(7);
        Long userId = jwtUtil.extractUserId(token); 

        return userRepository.findById(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
	
}
