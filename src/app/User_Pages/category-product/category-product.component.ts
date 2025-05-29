import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-product',
  standalone: false,
  templateUrl: './category-product.component.html',
  styleUrl: './category-product.component.css'
})
export class CategoryProductComponent implements OnInit{
  categoryName: string = '';
  products: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Read the category name from route
    this.categoryName = this.route.snapshot.paramMap.get('categoryName') || '';

    // Call API to get products by category
    this.http.get<any[]>(`http://localhost:8080/api/category/${this.categoryName}`).subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products by category', error);
      }
    );
  }
}
