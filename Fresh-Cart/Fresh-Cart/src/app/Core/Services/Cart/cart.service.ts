import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../../Enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private readonly httpclient: HttpClient) {}
  cartCount:BehaviorSubject<number> = new BehaviorSubject(0);

  postToCart(id: string): Observable<any> {
    return this.httpclient.post(
      `${baseUrl}/api/v1/cart`,
      {
        productId: id,
      }
      
    );
  }

  getDataCart(): Observable<any> {
    return this.httpclient.get(`${baseUrl}/api/v1/cart`,);
  }

  deletCart(id: string): Observable<any> {
    return this.httpclient.delete(`${baseUrl}/api/v1/cart/${id}`);
  }

  updateCount(id: string, count: number): Observable<any> {
    return this.httpclient.put(`${baseUrl}/api/v1/cart/${id}`, {
      count: count,
    });
  }
  clearCart(): Observable<any> {
    return this.httpclient.delete(`${baseUrl}/api/v1/cart`);
  }
}
