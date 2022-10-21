import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResp } from '../models/loginresp';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn:boolean=false;
  loginResp:any;
  constructor(private http:HttpClient) { }

  loginRequest(username:string, password:string) {
    const userData= {"username" :username, "password": password};
    //comprobaciones
    this.http.post("http://localhost:3050/login",userData)
    .subscribe({
      next: (response) => this.loginResp=response,
      error: (e) => console.error (e),
      complete: () => this.loggedIn=(this.loginResp.success)
    });
    return this.loggedIn;
  }

  isLoggedIn () {
    return this.loggedIn;
  }
}
