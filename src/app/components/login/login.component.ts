import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserInt } from 'src/app/models/userinterface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedIn:boolean=false;
  onLoginError:boolean=false;
  constructor(private auth:AuthService, router:Router) { }

  ngOnInit(): void {
    this.loggedIn=this.auth.isLoggedIn();
  }

  onLogin (username:string, password:string): void {
    const user:UserInt={username:username, password:password, email:''};
    if (username.trim()!=='' && password.trim()!==''){
      this.auth.login(user).subscribe({
        error: (e) => this.onLoginError=true,
        complete: () => {
          this.loggedIn=true;
          this.onLoginError=false;
        }
      });
    }
  }

  logOut () {
    this.auth.logout();
    this.loggedIn=false;
  }
}
