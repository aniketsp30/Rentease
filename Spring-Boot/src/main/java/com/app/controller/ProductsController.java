package com.app.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.entity.Products;
import com.app.repository.ProductsRepository;
import com.app.service.RentingService;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class ProductsController {
	@Autowired
	private ProductsRepository productRepository;


    @Autowired
    private RentingService rentingService;
    
	@GetMapping("/product")
	public List<Products> getAllProducts(){
		return productRepository.findAll();
		
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/product")
	public ResponseEntity<Map<String, String>> createProduct(@RequestParam("name") String name,
		    @RequestParam("description") String description,
		    @RequestParam("category") String category,
		    @RequestParam("quantity") int quantity,
		    @RequestParam("price") double price,
		    @RequestParam("available") String available,
            @RequestParam("images") List<MultipartFile> images) {
		try {
			Products product = new Products();
            product.setName(name);
            product.setDescription(description);
            product.setCategory(category);
            product.setQuantity(quantity);
            product.setPrice(price);
            product.setAvailable(available);

            productRepository.save(product);

            Long productId = product.getId();
            String uploadDir = System.getProperty("user.dir") + "/src/main/resources/static/images";
            File uploadPath = new File(uploadDir);
            if (!uploadPath.exists()) {
                uploadPath.mkdirs();
            }

            List<String> savedPaths = new ArrayList<>();
            for (MultipartFile file : images) {
                String originalName = file.getOriginalFilename();
                String extension = "";
                if (originalName != null && originalName.contains(".")) {
                    extension = originalName.substring(originalName.lastIndexOf("."));
                }
                String filename = "img" + productId + extension;
                java.nio.file.Path filePath = Paths.get(uploadDir, filename);
                Files.write(filePath, file.getBytes());
                savedPaths.add("/images/" + filename);
            }

            product.setImagePaths(String.join(",", savedPaths));
            productRepository.save(product);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Product created with image.");
            return ResponseEntity.ok(response);
            } catch (IOException e) {
            	Map<String, String> response = new HashMap<>();
                response.put("Error", "Product Not created.");
                return ResponseEntity.ok(response);        }
	}
	
	@GetMapping("/product/{id}")
	public ResponseEntity<Products> getProductsById(@PathVariable long id) {
		Products product = productRepository.findById(id)
		        .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
		    return ResponseEntity.ok(product);	
	}
	
	@PutMapping("/product/{id}")
	public ResponseEntity<Products> updateProducts(@PathVariable Long id, Products productDetail){
		Products product = productRepository.findById(id)
		        .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
		product.setName(productDetail.getName());
		product.setDescription(productDetail.getDescription());
		product.setPrice(productDetail.getPrice());
		product.setImagePaths(productDetail.getImagePaths());
		product.setCategory(productDetail.getCategory());
		product.setAvailable(productDetail.getAvailable());
		product.setQuantity(productDetail.getQuantity());

		Products updateProduct =productRepository.save(product);
		return ResponseEntity.ok(updateProduct);
	}
	
	@DeleteMapping("/product/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteProduct(@PathVariable Long id) {
		Products product = productRepository.findById(id)
		        .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));	
	        productRepository.delete(product);
	        Map<String,Boolean> res=new HashMap<>();
	        res.put("delete", Boolean.TRUE);
	        return ResponseEntity.ok(res);
	}
	
	@GetMapping("/category/{category}")
    public ResponseEntity<List<Products>> getByCategory(@PathVariable String category) {
        List<Products> products = productRepository.findByCategory(category);
        return ResponseEntity.ok(products);
    }
	
	@GetMapping("/products/top-rented")
    public List<Products> getTopRentedProducts() {
        return rentingService.getTopRentedProducts(4);
    }
}
