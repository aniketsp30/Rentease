import { Component } from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  standalone: false,
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {
   id:number=0;
   user:User=new User();
  constructor(private userService: UserService,
    private route:ActivatedRoute, private router:Router
  ){

  }
  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
      this.userService.getUserById(this.id).subscribe(data=>{
        this.user=data;
      },error=>console.log(error));
  }

  backOnList(){
      this.router.navigate(['admin-dashboard','users']);
  }

  onSubmit(){
  this.userService.updateUser(this.id, this.user).subscribe(
    response => {
      console.log(response);
      this.router.navigate(['admin-dashboard','users']);
    },
    error => {
      console.error(error);
    });
  }

}
