import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  standalone: false,
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  credentials = { username: '', password: '' };

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.auth.loginUser(this.credentials).subscribe({
      next: (res: any) => {
        if (res.role === 'ROLE_ADMIN') {
          this.auth.setToken(res.token);
          this.router.navigate(['/admin-dashboard']);
        } else {
          alert('Not an admin account!');
        }
      },
      error: () => alert('Login failed')
    });
  }
}
