import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedIn:boolean=false;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.loggedIn=this.auth.isLoggedIn();
  }

  logIn(username:string, password:string) {
    this.loggedIn=this.auth.loginRequest(username,password);
  }

  logOut () {
    this.auth.logOut();
  }
}
