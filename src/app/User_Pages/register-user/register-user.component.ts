import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  standalone: false,
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
  user= {
    username: '',
    phone: '',
    password: '',
    name:'',
    address:''
  };

  constructor(private auth: AuthService, private router: Router) {}

  onRegister(form: any) {
  if (!form.valid) {
    alert("Please fix the validation errors.");
    return;
  }

  this.auth.registerUser(this.user).subscribe({
    next: (res) => {
      alert(res);
      this.router.navigate(['/user-login']);
    },
    error: (err) => {
      alert('Registration failed: ' + err.error.message || err.message);
    }
  });
}
  backOnLogin(){
    this.router.navigate(['/user-login']);
  }
}
