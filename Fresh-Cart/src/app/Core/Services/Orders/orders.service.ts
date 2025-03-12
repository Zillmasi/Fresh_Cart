import { ElementsService } from './../Elements/elements.service';

import { baseUrl } from './../../Enviroment/enviroment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShippingAddress } from '../../../Shared/Interfaces/ipay-details';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  theToken = localStorage.getItem('token');
  constructor(private readonly httpClient: HttpClient) {}
  private readonly elementsService = inject(ElementsService);
  CartId: string = this.elementsService.CartID;

  postPayOnline(data: ShippingAddress, CartId: string): Observable<any> {
    return this.httpClient.post(
      `${baseUrl}/api/v1/orders/checkout-session/${CartId}?url=http://localhost:4200`,

      {
        shippingAddress: data,
      },

    );
  }
  postPayCash(data: ShippingAddress, CartId: string):Observable<any>
  {
   return this.httpClient.post(
      `${baseUrl}/api/v1/orders/${CartId}`,
      {
        shippingAddress: data,
      },
      
    );
  }

  getUserOrders(UserId:string):Observable<any>
  {
    return this.httpClient.get(`${baseUrl}/api/v1/orders/user/${UserId}`)
  }

  getAllOrders():Observable<any>{
    return this.httpClient.get(`${baseUrl}/api/v1/orders/`)
  }
}
