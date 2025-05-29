import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from './products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseURL="http://localhost:8080/api";

  constructor(private httpClient:HttpClient) { }
  
  getProductsList(): Observable<Products[]>{
    return this.httpClient.get<Products[]>(`${this.baseURL}/product`);
  }
  


  createProducts(formData: FormData): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/product`,formData);
  }
  


  getProductById(id:number): Observable<Products>{
    return this.httpClient.get<Products>(`${this.baseURL}/product/${id}`);
  }
  


  updateProducts(id: number,formData:FormData): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/product/${id}`,formData);
  }
  

  deleteProduct(id: number): Observable<Object> {
  return this.httpClient.delete(`${this.baseURL}/product/${id}`);
  }
  
  rentProduct(productId: number, userId: number, rentDatetime: string, returnDatetime: string): Observable<any> {
    const params = new HttpParams()
      .set('productId', productId.toString())
      .set('userId', userId.toString())
      .set('rentDatetime', rentDatetime)
      .set('returnDatetime', returnDatetime);

    return this.httpClient.post(`${this.baseURL}/renting/rent`, null, { params });
  }
  getProductsByCategory(category: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseURL}/category/${category}`);
  }
  getTopRentedProducts() {
  return this.httpClient.get<Products[]>(`${this.baseURL}/products/top-rented`);
}
}
