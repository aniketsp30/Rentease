package com.app.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entity.Products;
import com.app.repository.RentingRepository;

@Service
public class RentingService {
	@Autowired
    private RentingRepository rentingRepository;

    public List<Products> getTopRentedProducts(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        List<Object[]> results = rentingRepository.findTopRentedProducts(pageable);

        // Extract just Products from the result
        return results.stream()
                .map(result -> (Products) result[0])
                .collect(Collectors.toList());
    }
}
