package com.app.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entity.Renting;

public interface RentingRepository extends JpaRepository<Renting,Long>{

	@Query("SELECT r FROM Renting r LEFT JOIN FETCH r.payment WHERE r.user.uid = :userId")
	List<Renting> findByUserIdWithPayment(@Param("userId") Long userId);

	@Query("SELECT r.product AS product, COUNT(r) AS rentCount " +
	           "FROM Renting r " +
	           "GROUP BY r.product " +
	           "ORDER BY COUNT(r) DESC")
	    List<Object[]> findTopRentedProducts(Pageable pageable);
}
