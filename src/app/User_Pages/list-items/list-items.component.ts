import { Component } from '@angular/core';
import { ProductsService } from '../../products.service';
import { Products } from '../../products';

@Component({
  selector: 'app-list-items',
  standalone: false,
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css'
})
export class ListItemsComponent {
  products: Products[] = [];
  filteredProducts: Products[] = [];
  searchTerm: string = '';

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProductsList().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  filterProducts(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(term)
      
    );
  }
}
