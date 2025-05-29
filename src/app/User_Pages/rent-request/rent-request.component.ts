import { Component, OnInit } from '@angular/core';
import { RentService } from '../../rent.service';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-rent-request',
  standalone: false,
  templateUrl: './rent-request.component.html',
  styleUrl: './rent-request.component.css',
})
export class RentRequestComponent implements OnInit {
  
  requests: any[] = [];
  user: any;

  constructor(
    private rentingService: RentService,
    private router: Router,
    private userService:UserService,
    private http:HttpClient
  ) {}

  ngOnInit(): void {
  this.userService.getUserProfile().subscribe({
    next: (user) => {
      this.rentingService.getRentRequestsByUser(user.uid).subscribe(
        (data) => {
          console.log("Received requests:", data);
          this.requests = data;
          console.log(this.requests)
          const paidId = history.state.paidRequestId;
          if (paidId) {
            const paidRequest = this.requests.find(r => r.id === paidId);
            if (paidRequest) {
              paidRequest.paid = true;
            }
          }
        },
        (error) => {
          console.error("Error fetching requests:", error);
        }
      );  
    },
    error: () => alert('Could not load user profile')
  });
}

  goToPayment(request: any) {
  this.router.navigate(['payment'], { state: { request } });
}
  printReceipt(request: any) {
  const content = `
    <html>
      <head>
        <title>Payment Receipt</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h2 { text-align: center; }
          table { margin: 0 auto; border-collapse: collapse; width: 80%; }
          th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h2>Payment Receipt</h2>
        <table>
          <tr><th>Field</th><th>Details</th></tr>
          <tr><td>Product</td><td>${request.product.name}</td></tr>
          <tr><td>User</td><td>${request.user.uname}</td></tr>
          <tr><td>Email</td><td>${request.user.username}</td></tr>
          <tr><td>Amount</td><td>₹${request.product.price}</td></tr>
          <tr><td>Status</td><td>SUCCESS</td></tr>
          <tr><td>Rent Date</td><td>${new Date(request.rent_date).toLocaleDateString()}</td></tr>
          <tr><td>Return Date</td><td>${new Date(request.return_date).toLocaleDateString()}</td></tr>
        </table>
      </body>
    </html>
  `;

  const win = window.open('', '_blank');
  if (win) {
    console.log('Rent Request with Payment Info:', this.requests);
    win.document.write(content);
    win.document.close();  
    win.focus();           
    win.print();
  } else {
    alert('Please allow popups for this site to print the receipt.');
  }
}

  
}
