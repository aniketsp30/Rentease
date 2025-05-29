import { Component,OnInit } from '@angular/core';
import { Products } from '../../products'
import { ProductsService } from '../../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  standalone:false

})
export class ProductListComponent implements OnInit {
  products:Products[]=[];
  

  constructor(private ProductsService: ProductsService,
    private router:Router
  ){}
  ngOnInit():void{
   this.getProducts();
  }

  private getProducts(){
    this.ProductsService.getProductsList().subscribe(data =>{
      this.products=data;
    });
  }

  updateProduct( id:number){
    this.router.navigate(['admin-dashboard','update-product',id])
  }
  deleteProduct(id: number){
    if (confirm("Are you sure you want to delete this product?")){
      this.ProductsService.deleteProduct(id).subscribe(
      response => {
        console.log(response);
        this.getProducts();
      },
      error => {
        console.error(error);
      });
    }
  }
  viewProduct(id:number){
    this.router.navigate(['admin-dashboard','view-product',id])

  }
}
