import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  constructor(private userService:UserService){
  }
  user: any;
  ngOnInit(): void {
      this.userService.getUserProfile().subscribe({
        next:(data)=>this.user=data,
        error:()=>alert('Could  not load user Profile')
      })
  }
  
}
