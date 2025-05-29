package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entity.Products;

@Repository
public interface ProductsRepository extends JpaRepository<Products, Long>{

	List<Products> findAll();
	
	List<Products> findByCategory(String category);

}
