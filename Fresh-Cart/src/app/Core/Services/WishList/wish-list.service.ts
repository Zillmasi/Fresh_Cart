import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../../Enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  constructor(private readonly httpClient: HttpClient) {}

wishNum : BehaviorSubject<number> = new BehaviorSubject(0)

  postWishData(id: string): Observable<any> {
    return this.httpClient.post(`${baseUrl}/api/v1/wishlist`, {
      productId: id,
    });
  }
  getWishData():Observable<any>
  {
    return this.httpClient.get(`${baseUrl}/api/v1/wishlist`)
  }
  deleteWishData(id:string):Observable<any>{
    return this.httpClient.delete(`${baseUrl}/api/v1/wishlist/${id}`)
  }
}
