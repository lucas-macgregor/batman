import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn:boolean=false;
  loginResp:any;
  constructor(private http:HttpClient, private router:Router) { }

  loginRequest(username:string, password:string) {
    const userData= {"username" :username, "password": password};
    //comprobaciones pendientes
    this.http.post("http://localhost:3050/login",userData)
    .subscribe({
      next: (response) => this.loginResp=response,
      error: (e) => console.error (e),
      complete: () => {
        this.loggedIn=(this.loginResp.success)
        if (this.loggedIn===true) {
          localStorage.setItem('loggedIn','true');
          this.router.navigateByUrl('inicio');
        }
      }
    });
    return this.loggedIn;
  }

  setInitialStatus() {
    const stored=localStorage.getItem('loggedIn');
    if (stored === null) {
      this.loggedIn=false;
    }
    else if (stored==='true') {
      this.loggedIn=true;
    }
    else
      this.loggedIn=false;
  }
  
  isLoggedIn () {
    return this.loggedIn;
  }

  logOut() {
    this.loggedIn=false;
    localStorage.removeItem('loggedIn');
    this.router.navigateByUrl('inicio');
  }
}
