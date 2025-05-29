import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-side',
  standalone: false,
  templateUrl: './admin-side.component.html',
  styleUrl: './admin-side.component.css'
})
  export class AdminSideComponent implements OnInit {
    selectedOption: string = ''; 
    showNavbar = true;
    constructor(private auth:AuthService ,
      private router:Router , 
      private route:ActivatedRoute){}
    logout(): void {
    this.auth.logout();
    this.router.navigate(['admin-login']); 
  }

  navigateTo(path: string): void {
    console.log("Navigating to:", path);
    this.router.navigate([path], { relativeTo: this.route });
  }
  
  onRadioChange(value: string): void {
    console.log("Radio changed to:", value);
    this.selectedOption = value;
    this.navigateTo(value);
  }


  ngOnInit(): void {
     this.route.firstChild?.url.subscribe(urlSegment => {
      const path = urlSegment[0]?.path;
      if (path === 'users') {
        this.selectedOption = 'users';
      }else {
        this.selectedOption = 'products';
      }
    });
  }

  
}