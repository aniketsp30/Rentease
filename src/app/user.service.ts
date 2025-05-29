import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { LoginRequest } from './model/login-request';
import { LoginResponse } from './model/login-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL="http://localhost:8080/api/user"

  constructor(private httpClient:HttpClient) { }

  userLogin(request: LoginRequest):Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>(this.baseURL,request);
  }

  getUserList(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseURL}`);
  }

  createUser(user: User): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,user,{responseType:'text'});
  }

  getUserById(id:number): Observable<User>{
    return this.httpClient.get<User>(`${this.baseURL}/${id}`);
  }

  updateUser(id: number,user:User): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,user);
  }

  deleteUser(id: number): Observable<Object> {
  return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  getUserProfile() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.httpClient.get<User>(`${this.baseURL}/profile`, { headers });
  }

}
