package com.app.service;

import java.util.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.app.config.CustomerUserDetails;
import com.app.entity.Admin;
import com.app.entity.User;
import com.app.repository.AdminRepository;
import com.app.repository.UserRepository;

@Service
public class CustomUserService implements UserDetailsService{
	@Autowired private UserRepository userRepo;
    @Autowired private AdminRepository adminRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (adminRepo.findByUsername(username).isPresent()) {
            Admin admin = adminRepo.findByUsername(username).get();

            return new CustomerUserDetails(
                admin.getId(),
                admin.getUsername(),
                admin.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority("ROLE_ADMIN"))
            );
        } else if (userRepo.findByUsername(username).isPresent()) {
            User user = userRepo.findByUsername(username).get();

            return new CustomerUserDetails(
                user.getUid(),
                user.getUsername(),
                user.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))
            );
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }

}
