import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.auth.loginUser(this.credentials).subscribe({
      next: (res: any) => {
        if (res.role === 'ROLE_USER') {
          this.auth.setToken(res.token);
          localStorage.setItem('token',res.token)
          this.router.navigate(['/user-dashboard']);
        } else {
          alert('Not a user account!');
        }
      },
      error: () => alert('Login failed')
    });
  }
}
