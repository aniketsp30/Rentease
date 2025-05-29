import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = 'http://localhost:8080/api/auth';  // Your Spring Boot backend URL

  constructor(private http: HttpClient, private router: Router) {}

  loginUser(credentials: {username:string,password:string}) {
    return this.http.post(`${this.BASE_URL}/login`, credentials);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }


  isLoggedIn(): boolean {
   if (typeof window !== 'undefined' && localStorage.getItem('token')) {
    return true;
  }
  return false;
}  

  registerAdmin(adminData: {username:string,password:string,email:string}): Observable<any> {
    return this.http.post(`${this.BASE_URL}/register-admin`, adminData, {
      responseType: 'text' // because backend returns plain string
    });
  }

  registerUser(userData: {username:string,password:string,name:string,address:string,phone:string}): Observable<any> {
    return this.http.post(`${this.BASE_URL}/register-user`, userData, {
      responseType: 'text' // because backend returns plain string
    });
  }

  logout(): void {
  localStorage.removeItem('token'); 
  localStorage.removeItem('role'); 
  localStorage.removeItem('username'); 
  }

  getUserRole(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role; // This should return "ROLE_ADMIN" or "ROLE_USER"
  }
  getUserId(): number {
  const token = localStorage.getItem('token');
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userId;
  }
  return 0;
}
}
