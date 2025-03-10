import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../Enviroment/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private readonly httpClient:HttpClient) { }

  getCategoryData():Observable<any>
  {
  return  this.httpClient.get(`${baseUrl}/api/v1/categories`);
  }
  getSpecificCategory(id:string|null):Observable<any>
  {
  return  this.httpClient.get(`${baseUrl}/api/v1/categories/${id}`);
  }
}
