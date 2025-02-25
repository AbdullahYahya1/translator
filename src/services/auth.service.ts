import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { enviroment } from '../enviroments/enviroments';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  private path = enviroment.apiUrl;
  httpClient = inject(HttpClient)
  constructor(private router: Router) { }
  public signOutExternal = () =>
  {
    let anonReqCount = localStorage.getItem('anonReqCount') || '0';
    localStorage.clear();
    localStorage.setItem("anonReqCount",anonReqCount)
    this.router.navigate(['/login']);
  }
  LoginWithGoogle(credentials: string): Observable<any>
  {
    const body = {
      credential: credentials
    }
    return this.httpClient.post(this.path + "/api/Auth/loginGoogle", body);
  }
  public refreshToken(refreshToken: string)
  {
    const body = {
      refreshToken: refreshToken
    };
    return this.httpClient.post(`${this.path}/api/Auth/refresh`, body);
  }
  public login(email: string, pass: string): Observable<any>
  {
    const body = {
      email: email,
      password: pass
    }
    return this.httpClient.post(`${this.path}/api/Auth/login`, body);
  }
  public register(Username:string , Email: string, Password: string): Observable<any>
  {
    const body = {
      email: Email,
      password: Password,
      username:Username
    }
    return this.httpClient.post(`${this.path}/api/Auth/register`, body);
  }
}
