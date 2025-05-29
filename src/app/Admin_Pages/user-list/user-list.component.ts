import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit  {
  user:User[]=[];
  

  constructor(private userService: UserService,
    private router:Router
  ){}
  ngOnInit():void{
   this.getUsers();
  }

  private getUsers(){
    this.userService.getUserList().subscribe(data =>{
      this.user=data;
    });
  }

  updateUser( id:number){
    this.router.navigate(['admin-dashboard','update-user',id])
  }
  deleteUser(id: number){
    if (confirm("Are you sure you want to delete this User?")){
      this.userService.deleteUser(id).subscribe(
      response => {
        console.log(response);
        this.getUsers();
      },
      error => {
        console.error(error);
      });
    }
  }
  viewUser(id:number){
    this.router.navigate(['admin-dashboard','view-user',id])

  }
}
