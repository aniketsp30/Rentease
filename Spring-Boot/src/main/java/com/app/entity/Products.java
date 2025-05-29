package com.app.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Products")
public class Products {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	private int quantity;
	private double price;
	private String name,description, category,available="Available",imagePaths;
	

	
	public Products() {
		super();
		// TODO Auto-generated constructor stub
	}
	/**
	 * @param name
	 * @param description
	 * @param category
	 * @param available
	 */
	public Products(int quantity, String name, String description, String category,double price, String available) {
		super();
		this.name = name;
		this.quantity=quantity;
		this.price=price;
		this.description = description;
		this.category = category;
		this.available = available;
	}
	/**
	 * @return the id
	 */
	public long getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(long id) {
		this.id = id;
	}
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * @return the quantity
	 */
	public int getQuantity() {
		return quantity;
	}
	/**
	 * @param quantity the quantity to set
	 */
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	/**
	 * @return the price
	 */
	public double getPrice() {
		return price;
	}
	/**
	 * @param price the price to set
	 */
	public void setPrice(double price) {
		this.price = price;
	}
	public String getDescription() {
		return description;
	}
	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}
	/**
	 * @return the category
	 */
	public String getCategory() {
		return category;
	}
	/**
	 * @param category the category to set
	 */
	public void setCategory(String category) {
		this.category = category;
	}
	/**
	 * @return the available
	 */
	public String getAvailable() {
		return available;
	}
	/**
	 * @param available the available to set
	 */
	public void setAvailable(String available) {
		this.available = available;
	}
	/**
	 * @return the imagePaths
	 */
	public String getImagePaths() {
		return imagePaths;
	}
	/**
	 * @param imagePaths the imagePaths to set
	 */
	public void setImagePaths(String imagePaths) {
		this.imagePaths = imagePaths;
	}
}
	
