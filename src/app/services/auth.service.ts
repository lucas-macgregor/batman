import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRespInt } from '../models/loginRespInterface'
import { UserLoginInt } from '../models/userLoginInterface';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import swal from 'sweetalert2'
import { UserInfoInt } from '../models/userInfoInt';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private AUTH_SERVER: string = 'http://localhost:3050';
  private username = new BehaviorSubject('');
  private email = new BehaviorSubject('');
  private token: string='';
  private loggedIn = new BehaviorSubject(false);

  constructor(private http:HttpClient, private router:Router) {

  }

  //public register(user: UserInt):Observable<JWTInt> {
  //  return this.http.post<JWTInt>(`${this.AUTH_SERVER}/registro`,user)
  //  .pipe(tap(
  //    (res: JWTInt) => {
  //      if (res) {
  //        this.saveToken(res.accessToken)
  //      }
  //    }) 
  //  );
  //}

  public login(user: UserLoginInt):Observable<LoginRespInt> {
    return this.http.post<LoginRespInt>(`${this.AUTH_SERVER}/login`,user)
    .pipe(tap(
      (res: LoginRespInt) => {
        if (res) {
          this.saveToken(res.accessToken);
          this.username.next(res.username);
          this.email.next(res.email);
        }
      })
    );
  }

  public logout (): void {
    this.token ='';
    localStorage.removeItem("ACCESS_TOKEN");
    this.loggedIn.next(false);
    this.username.next('');
  }

  private saveToken(token:string):void {
    localStorage.setItem("ACCESS_TOKEN", token);
    this.token=token;
  }

  public getToken(): string {
    const storage=localStorage.getItem("ACCESS_TOKEN");
    if (storage!==null) {
      if (!this.token || this.token===''){
        this.token = storage;
      }
    }
    return this.token;
  }

  public setInitialStatus():void {
    const stored=localStorage.getItem('ACCESS_TOKEN');
    if (stored === null) {
      this.loggedIn.next(false);
    }
    else  {
      this.token=stored;
      const unameResp=this.http.get<UserInfoInt>(this.AUTH_SERVER+'/getuserinfo', {responseType: 'json'});
      unameResp.subscribe({
        next: (uname) => {
          this.username.next(uname.username);
          this.email.next(uname.email);
          this.loggedIn.next(true);
        },
        error: (e) => console.log(e)
      })
    }
  }
  
  public isLoggedIn ():Observable<boolean> {
    this.setInitialStatus();
    return this.loggedIn;
  }

  public getUsername():Observable<string> {
    return this.username;
  }

  public getEmail():Observable<string> {
    return this.email;
  }

  public expiredToken ():void {
    swal.fire({
      title: 'Sesion expirada.',
      text: 'Ingrese nuevamente a su cuenta.',
      icon: 'info'
    });
    this.logout();
    this.router.navigateByUrl('/login');
  }
}
