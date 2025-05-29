import { Component, OnInit } from '@angular/core';
import { Products } from '../../products';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../products.service';
import { Rent } from '../../rent';
import { AuthService } from '../../services/auth.service';
import { RentService } from '../../rent.service';
import { DatePipe } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail-product',
  standalone: false,
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css',
  providers: [DatePipe] 
})
export class DetailProductComponent implements OnInit {
  productId!: number;
  product!: Products;
  showRentModal = false;
  
  minDate: string='';
  rentForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router:Router,
    private rentService:RentService,
    private authService:AuthService,
    private datePipe: DatePipe,
    private fb: FormBuilder

  ) {
    this.rentForm = this.fb.group({
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required]
    }, { validators: returnDateAfterRentDateValidator });
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProduct();
    const now = new Date();
  this.minDate = this.datePipe.transform(now, 'yyyy-MM-dd') || '';
  }

  getProduct(): void {
    this.productService.getProductById(this.productId).subscribe(
      (data: Products) => {
        this.product = data;
      },
      (error) => {
        console.error('Error fetching product', error);
      }
    );
  }
  backOnList(){
      this.router.navigate(['user-dashboard','items']);
  }
  
  openRentModal() {
    this.showRentModal = true;
  }
  
  closeRentModal() {
    this.showRentModal = false;
  } 

  createRentRequest() {
    const userId = this.authService.getUserId(); 
    const rentDate = this.datePipe.transform(this.rentForm.value.rentDate, 'yyyy-MM-dd')??'';
    const returnDate = this.datePipe.transform(this.rentForm.value.returnDate, 'yyyy-MM-dd')??'';
    if (!rentDate || !returnDate) {
    alert("Please select valid rent and return dates.");
    return;
  }
      const rentRequest: Rent = {
      product: { id: this.product.id },
      user: { uid: userId },
      rent_date: rentDate,
      return_date: returnDate,
      status: 'REQUEST'
    };

    this.rentService.createRentRequest(rentRequest).subscribe({
      next: (response) => {
        console.log("Sending rent request:", rentRequest);
        alert("Rent request sent successfully!");
        this.closeRentModal();
      },
      error: (err) => {
        console.error(err);
        console.log(rentRequest);
        alert("Failed to send rent request.");
      }
    });
  }

} 
export const returnDateAfterRentDateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const rentDate = control.get('rentDate')?.value;
  const returnDate = control.get('returnDate')?.value;

  if (!rentDate || !returnDate) {
    return null;
  }

  const rent = new Date(rentDate);
  const ret = new Date(returnDate);

  return rent && ret && new Date(ret) <= new Date(rent) 
      ? { returnBeforeRent: true } 
      : null;
};

