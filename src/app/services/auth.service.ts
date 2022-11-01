import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JWTInt } from '../models/jwtinterface';
import { UserInt } from '../models/userinterface';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  AUTH_SERVER: string = 'http://localhost:3050';
  loggedIn:boolean=false;
  private username:string='';
  //JWT PROPERTIES
  private token: string='';

  constructor(private http:HttpClient, private router:Router) { }

  //JWT METHODS

  register(user: UserInt):Observable<JWTInt> {
    return this.http.post<JWTInt>(`${this.AUTH_SERVER}/registro`,user)
    .pipe(tap(
      (res: JWTInt) => {
        if (res) {
          this.saveToken(res.accessToken, res.expiresIn)
        }
      }) 
    );
  }

  login(user: UserInt):Observable<JWTInt> {
    return this.http.post<JWTInt>(`${this.AUTH_SERVER}/login`,user)
    .pipe(tap(
      (res: JWTInt) => {
        if (res) {
          this.saveToken(res.accessToken, res.expiresIn);
          this.username=res.name;
          localStorage.setItem('username', res.name)
        }
      })
    );
  }

  logout (): void {
    this.token ='';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    localStorage.removeItem("username");
  }

  private saveToken(token:string, expiresIn:string):void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token=token;
  }

  getToken(): string {
    const storage=localStorage.getItem("ACCESS_TOKEN");
    if (storage!==null) {
      if (!this.token || this.token===''){
        this.token = storage;
      }
    }
    return this.token;
  }

  setInitialStatus() {
    const stored=localStorage.getItem('ACCESS_TOKEN');
    const username=localStorage.getItem('username');
    if (stored === null) {
      this.loggedIn=false;
    }
    else if (username!==null) {
      this.loggedIn=true;
      this.token=stored;
      this.username=username;
    }
  }
  
  isLoggedIn () {
    this.setInitialStatus();
    return this.loggedIn;
  }

  getUsername() {
    if (this.username!=='')
      return this.username;
    else
      return '';
  }
}
