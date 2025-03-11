import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../Enviroment/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private readonly httpClient:HttpClient) { }

  getAllProducts():Observable<any>{
    return this.httpClient.get(`${baseUrl}/api/v1/products`)
  }
  getSpecificProd(id:string|null):Observable<any>
  {
  return  this.httpClient.get(`${baseUrl}/api/v1/products/${id}`)
  }
}
