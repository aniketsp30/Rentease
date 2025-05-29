package com.app.entity;

import jakarta.persistence.*;

import java.time.LocalDate;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;


@Entity
@Table(name = "renting")
public class Renting {

	

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Products product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;

    @JsonProperty("rent_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private LocalDate rentDate;
    
    @OneToOne(mappedBy = "renting", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Payment payment;
    
    @JsonProperty("return_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private LocalDate returnDate;

    @Column(nullable = false)
    private String status = "REQUEST"; // default value

    /**
	 * 
	 */
	public Renting() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * @return the product
	 */
	public Products getProduct() {
		return product;
	}

	/**
	 * @param product the product to set
	 */
	public void setProduct(Products product) {
		this.product = product;
	}

	/**
	 * @return the user
	 */
	public User getUser() {
		return user;
	}

	/**
	 * @param user the user to set
	 */
	public void setUser(User user) {
		this.user = user;
	}

	
	/**
	 * @return the status
	 */
	/**
	 * @return the rentDate
	 */
	public LocalDate getRentDate() {
		return rentDate;
	}

	/**
	 * @param rentDate the rentDate to set
	 */
	public void setRentDate(LocalDate rentDate) {
		this.rentDate = rentDate;
	}

	/**
	 * @return the returnDate
	 */
	public LocalDate getReturnDate() {
		return returnDate;
	}

	/**
	 * @param returnDate the returnDate to set
	 */
	public void setReturnDate(LocalDate returnDate) {
		this.returnDate = returnDate;
	}

	public String getStatus() {
		return status;
	}

	/**
	 * @param status the status to set
	 */
	public void setStatus(String status) {
		this.status = status;
	}
	
	/**
	 * @return the payment
	 */


	

    
}

