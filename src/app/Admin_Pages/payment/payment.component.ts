import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  request: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.request = history.state.request;
    if (!this.request) {
      alert('No request found!');
      this.router.navigate(['/rent-request']);
    }
  }

  confirmPayment() {
  const paymentData = {
    user: { uid: this.request.user.uid },
    product: { id: this.request.product.id },
    renting: { id: this.request.id },  
    status: 'SUCCESS',
    amount: this.request.product.price,
  };


  this.http.post('http://localhost:8080/api/payments/save', paymentData, { responseType: 'text' })
    .subscribe(() => {
      console.log(paymentData);
      alert('Payment successful!');
      this.router.navigate(['user-dashboard', 'request-list'], { state: { paidRequestId: this.request.id } });
    }, (error) => {
      console.error('Payment failed', error);
      alert('Payment failed!');
    });
}

  cancelPayment() {
    const paymentData = {
    user: { uid: this.request.user.uid },
    product: { id: this.request.product.id },
    renting: { id: this.request.id },  
    status: 'FAILED',
    amount: this.request.product.price,
  };


    this.http.post('http://localhost:8080/api/payments/cancel', paymentData, { responseType: 'text' })
    .subscribe(() => {
      console.log(paymentData);
      alert('Payment cancelled.');
      this.router.navigate(['user-dashboard','request-list']);
    }, (error) => {
      console.error('Cancel failed', error);
      alert('Cancel operation failed!');
    });
  }
}
