import { Component } from '@angular/core';
import { User } from '../../user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-view-user',
  standalone: false,
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent {
  id:number=0;
  user:User=new User();

  constructor( private router:Router, private route:ActivatedRoute, private userService:UserService){
  }
  backOnList(){
      this.router.navigate(['admin-dashboard','users']);
  }

  ngOnInit(): void {
      this.id=this.route.snapshot.params['id'];
      this.userService.getUserById(this.id).subscribe(data=>{
        this.user=data;
      });
  }

}
