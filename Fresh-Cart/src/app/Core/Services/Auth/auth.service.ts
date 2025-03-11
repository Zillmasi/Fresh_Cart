import { jwtDecode } from 'jwt-decode';
import { TokenInfo } from './../../Interfaces/token-info';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Pipe } from '@angular/core';
import { baseUrl } from '../../Enviroment/enviroment';
import { UserInfo, userInfo } from 'os';
import { Userdata } from '../../Interfaces/userdata';
import { UserLoginData } from '../../Interfaces/user-login-data';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ResetNewPass } from '../../Interfaces/reset-new-pass';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

UsertokenInfo!:TokenInfo
 public  router=inject(Router)
 
  constructor(private readonly httpClient:HttpClient ,   ) { }

  postRegisterData(userData:Userdata ):Observable<any>
  {
   return this.httpClient.post(`${baseUrl}/api/v1/auth/signup` , userData)
  }
  postLoginData(userData:UserLoginData ):Observable<any>{
    return this.httpClient.post(`${baseUrl}/api/v1/auth/signin` , userData)
  }

  tokenInfo(){
   this.UsertokenInfo = jwtDecode(localStorage.getItem('token') !)
  }

  LogOut(){
    localStorage.removeItem('token');
    this.UsertokenInfo= {} as TokenInfo;
    this.router.navigate(["/login"])
  }

  PassForget(data:string):Observable<any>
  {
    return this.httpClient.post(`${baseUrl}/api/v1/auth/forgotPasswords` , data)
  }

  resetCode(resetCode:object):Observable<any>{
    return this.httpClient.post(`${baseUrl}/api/v1/auth/verifyResetCode`, resetCode)
  }

  newPass(data:ResetNewPass):Observable<any>
  {
    return this.httpClient.put(`${baseUrl}/api/v1/auth/resetPassword` , data)
  }

}
