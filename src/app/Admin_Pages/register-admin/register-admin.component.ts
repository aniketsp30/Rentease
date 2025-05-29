import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-admin',
  standalone: false,
  templateUrl: './register-admin.component.html',
  styleUrl: './register-admin.component.css'
})
export class RegisterAdminComponent {
admin = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  onRegister() {
    this.auth.registerAdmin(this.admin).subscribe({
      next: (res) => {
        alert(res); // backend returns success message
        this.router.navigate(['/admin-login']);
      },
      error: (err) => {
        alert('Registration failed: ' + err.error.message || err.message);
      }
    });
  }
}
