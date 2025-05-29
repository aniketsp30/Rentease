import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from '../../products';
import { ProductsService } from '../../products.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products: Products[] = [];  
  topProducts: Products[] = [];

  categories = [
    {
      title: 'Clothing & Accessories',
      icon: '👕', // Use an icon font, emoji, or image path
    },
    {
      title: 'Electronics & Entertainment',
      icon: '📺',
    },
    {
      title: 'Home Essentials',
      icon: '🏠',
    },
    {
      title: 'Event & Decoration',
      icon: '🎉',
    },
    {
      title: 'Tools & Equipment',
      icon: '🛠️',
    },
  ];
  constructor(private router: Router, private productService: ProductsService, private http:HttpClient) {}

  ngOnInit() {
  this.productService.getTopRentedProducts().subscribe({
    next: (data) => this.topProducts = data,
    error: (err) => console.error(err),
  });
  }

  goToCategory(category: string) {
    this.router.navigate(['user-dashboard','category', category]);
  }

  getProducts(): void {
    this.productService.getProductsList().subscribe(data => {
      this.products = data;
    });
  }
  

}