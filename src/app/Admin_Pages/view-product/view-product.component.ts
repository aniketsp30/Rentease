import { Component, OnInit } from '@angular/core';
import { Products } from '../../products';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-view-product',
  standalone: false,
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent implements OnInit {
  
  id:number=0;
  product:Products=new Products();

  constructor( private router:Router, private route:ActivatedRoute, private productService:ProductsService){
  }
  backOnList(){
      this.router.navigate(['admin-dashboard','products']);
  }

  ngOnInit(): void {
      this.id=this.route.snapshot.params['id'];
      this.productService.getProductById(this.id).subscribe(data=>{
        this.product=data;
      });
  }
}
