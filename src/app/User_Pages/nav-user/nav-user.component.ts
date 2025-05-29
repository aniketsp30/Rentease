import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-nav-user',
  standalone: false,
  templateUrl: './nav-user.component.html',
  styleUrl: './nav-user.component.css'
})
export class NavUserComponent implements OnInit {
    user: any;

  constructor(private userService:UserService, private auth:AuthService,private router:Router){}
  

  logout(): void {
    this.auth.logout();
    this.router.navigate(['user-login']); 
  }
  goProfile():void{
    this.router.navigate(['user-dashboard','profile'])
  }

  ngOnInit(): void {
      this.userService.getUserProfile().subscribe({
        next:(data)=>this.user=data,
        error:()=>alert('Could  not load user Profile')
      })
  }
  goToRequestList(): void {
  if (this.user && this.user.uid) {
    this.router.navigate(['user-dashboard/request-list', this.user.uid]);
  } else {
    alert('User ID not available');
  }
}
}
