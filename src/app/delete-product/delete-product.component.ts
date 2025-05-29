import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-product',
  standalone: false,
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.css'
})
export class DeleteProductComponent {
    id:number=0;
  constructor(private productsService: ProductsService,
    private router: Router
  ){

  
  }
}
