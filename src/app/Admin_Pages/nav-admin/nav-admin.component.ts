import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-admin',
  standalone: false,
  templateUrl: './nav-admin.component.html',
  styleUrl: './nav-admin.component.css'
})
export class NavAdminComponent {
  constructor(private auth:AuthService , private router:Router,private route: ActivatedRoute){}
  
  logout(): void {
    this.auth.logout();
    this.router.navigate(['admin-login']); 
  }
  navigateTo(path: string) {
  this.router.navigate([path], { relativeTo: this.route });
  }
}
