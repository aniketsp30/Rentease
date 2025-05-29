package com.app.config;

import java.time.Duration;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {
	private final String SECRET_KEY;

    public JwtUtil(@Value("${jwt.secret}") String secretKey) {
        this.SECRET_KEY = "MyRentease";
    }

    public String generateToken(UserDetails userDetails) {
        // Cast userDetails to your custom UserDetails implementation
        CustomerUserDetails customUser = (CustomerUserDetails) userDetails;

        // Extract role from authorities
        String role = customUser.getAuthorities().stream()
                .findFirst().get().getAuthority();

        // Build token with username, role and userId claims
        return Jwts.builder()
                .setSubject(customUser.getUsername())
                .claim("role", role)
                .claim("userId", customUser.getId())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() +  Duration.ofHours(10).toMillis())) // 10 hours
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    public Date extractExpiration(String token) {
        return extractClaims(token).getExpiration();
    }

    private Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

    public Long extractUserId(String token) {
        return extractClaims(token).get("userId", Long.class);
    }
    
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}
