import { Component, Input } from '@angular/core';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-rent-product',
  standalone: false,
  templateUrl: './rent-product.component.html',
  styleUrl: './rent-product.component.css'
})
export class RentProductComponent {
  @Input() productId!: number;  // pass product id as input
  userId: number = 1;           // example, replace with actual logged-in user ID

  rentDatetime: string = '';
  returnDatetime: string = '';
  message: string = '';

  constructor(private productService: ProductsService) {}

  rent() {
    if (!this.rentDatetime || !this.returnDatetime) {
      this.message = "Please select both rent and return date/time";
      return;
    }

    if (this.returnDatetime <= this.rentDatetime) {
      this.message = "Return datetime must be after rent datetime";
      return;
    }

    this.productService.rentProduct(this.productId, this.userId, this.rentDatetime, this.returnDatetime)
      .subscribe({
        next: (res) => {
          this.message = "Product rented successfully!";
        },
        error: (err) => {
          this.message = "Error renting product: " + err.message;
        }
      });
  }
}
