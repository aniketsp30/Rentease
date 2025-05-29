import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      // Check route to decide where to redirect
      const url = state.url;

      if (url.includes('admin')) {
        this.router.navigate(['/admin-login']);
      } else {
        this.router.navigate(['/user-login']);
      }

      return false;
    }
  }
  
}
