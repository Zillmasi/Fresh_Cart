import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../Enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private readonly httpClient: HttpClient) {}

  getAllData(): Observable<any> {
    return this.httpClient.get(`${baseUrl}/api/v1/brands`);
  }

  getSpecificData(id: string | null): Observable<any> {
    return this.httpClient.get(`${baseUrl}/api/v1/brands/${id}`);
  }
}
