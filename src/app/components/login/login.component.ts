import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserLoginInt } from 'src/app/models/userLoginInterface';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  protected loggedIn:boolean=false;
  protected onLoginError:boolean=false;
  constructor(private auth:AuthService) {   }

  ngOnInit(): void {
  this.auth.isLoggedIn().subscribe({
      next: (stat) => this.loggedIn=stat,
      error: (e) => console.log(e)
    });
  }

  protected onLogin (username:string, password:string): void {
    const user:UserLoginInt={username:username, password:password, email:''};
    if (username.trim()!=='' && password.trim()!==''){
      this.auth.login(user).subscribe({
        error: () => this.onLoginError=true,
        next: () => {
          this.onLoginError=false;
        }
      });
    }
  }

  protected logOut ():void {
    this.auth.logout();
  }

}
