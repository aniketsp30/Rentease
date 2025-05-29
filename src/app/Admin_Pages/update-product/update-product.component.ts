import { Component, OnInit } from '@angular/core';
import { Products } from '../../products';
import { ProductsService } from '../../products.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-update-product',
  standalone: false,
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {
  id:number=0;
  products:Products=new Products();
  constructor(private productsService: ProductsService,
    private route:ActivatedRoute, private router:Router
  ){

  }
  ngOnInit(): void {
    const Id = this.route.snapshot.paramMap.get('id');
    if (Id) {
      this.id = +Id; // Convert string to number
      console.log('Product ID:', this.id);

      this.productsService.getProductById(this.id).subscribe(
        data => {
          this.products = data;
        },
        error => console.log(error)
      );
    }
  }

    selectedImages: File[] = [];

  
  onImageSelected(event: any) {
    this.selectedImages = Array.from(event.target.files);
  }

  backOnList(){
      this.router.navigate(['admin-dashboard','products']);
  }

  onSubmit(){
    const formData = new FormData();

  Object.keys(this.products).forEach(key => {
    console.log(`${key}:`, (this.products as any)[key]);
    formData.append(key, (this.products as any)[key]);
  });

  this.selectedImages.forEach(file => {
    formData.append('images', file);
  });

  this.productsService.updateProducts(this.id, formData).subscribe(
    response => {
      console.log(response);
      this.router.navigate(['admin-dashboard','products']);
    },
    error => {
      console.error(error);
    });
  }
}

