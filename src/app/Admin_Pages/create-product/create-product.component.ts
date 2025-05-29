import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
  standalone:false
})
export class CreateProductComponent {
products = {
    name: '',
    description: '',
    category: '',
    quantity: 0,
    price: 0,
    available: '',
    username: ''
  };  
  selectedImages: File[] = [];
  
  constructor(private http: HttpClient, private router: Router) {}

  onImageSelected(event: any) {
    this.selectedImages = Array.from(event.target.files);
  }
  backOnList(){
      this.router.navigate(['admin-dashboard','products']);
  }

  onSubmit() {
    const formData = new FormData();
  formData.append('name', this.products.name);
  formData.append('description', this.products.description);
  formData.append('category', this.products.category);
  formData.append('quantity', this.products.quantity.toString());
  formData.append('price', this.products.price.toString());
  formData.append('available', this.products.available);

  for (let i = 0; i < this.selectedImages.length; i++) {
    formData.append('images', this.selectedImages[i]);
  }

  this.http.post('http://localhost:8080/api/product', formData).subscribe({
    next: (response) => {
      console.log("Product created successfully", response);
      this.router.navigate(['admin-dashboard','products']);
    },
    error: (error) => {
      console.error("Error while creating product", error);
    }
  });
  }
}
