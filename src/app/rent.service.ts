import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rent } from './rent';

@Injectable({
  providedIn: 'root'
})
export class RentService {
  private baseUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient) { }

  createRentRequest(renting:Rent): Observable<any> {
      console.log("Rent request in service");
    return this.http.post(`${this.baseUrl}/renting/rent`, renting);
  }
  getRentRequestsByUser(userId: number) {
  return this.http.get<any[]>(`${this.baseUrl}/renting/user/${userId}`);
  }
  getAllRequests(): Observable<Rent[]> {
    return this.http.get<Rent[]>(`${this.baseUrl}/admin/rent-requests`);
  }

  approveRequest(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/rent-requests/${id}/approve`, {});
  }

  rejectRequest(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/rent-requests/${id}/reject`, {});
  }
}
