import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../user';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-create-user',
  standalone: false,
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {
user :User=new User();
  
  constructor(private userService:UserService, private router:Router,private http:HttpClient){}

  backOnList(){
      this.router.navigate(['admin-dashboard','users']);
  }
  ngOnInit(): void {
      
  }
  onSubmit() {
    this.userService.createUser(this.user).subscribe(
      data=>{
        console.log('User added Successfully',data);
        this.router.navigate(['admin-dashboard','users']);
      },error=>console.log(error)
    )   
    
  }

}
