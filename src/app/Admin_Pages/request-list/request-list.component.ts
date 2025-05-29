import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-list',
  standalone: false,
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent implements OnInit {
  allRequests: any[] = [];
  showPendingOnly = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    this.http.get<any[]>('http://localhost:8080/api/admin/rent-requests')
      .subscribe(data => {
        this.allRequests = data;
      });
  }

  togglePendingView() {
    this.showPendingOnly = !this.showPendingOnly;
  }

  approveRequest(id: number) {
    this.http.put(`http://localhost:8080/api/admin/rent-requests/${id}/approve`, {})
      .subscribe(() => this.loadRequests());
  }

  rejectRequest(id: number) {
    this.http.put(`http://localhost:8080/api/admin/rent-requests/${id}/reject`, {})
      .subscribe(() => this.loadRequests());
  }

  get displayedRequests() {
    return this.showPendingOnly
      ? this.allRequests.filter(req => req.status === 'REQUEST')
      : this.allRequests;
  }
}
