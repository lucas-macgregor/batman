import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn:boolean=false;
  constructor() { }

  loginRequest() {
    this.loggedIn=!this.loggedIn
  }

  isLoggedIn () {
    return this.loggedIn;
  }
}
