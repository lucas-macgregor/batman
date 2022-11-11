import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  username:string='';

  constructor(private auth:AuthService) {
    this.auth.getUsername().subscribe({
      next: (uname) => this.username=uname,
      error: (e) => console.log(e)
    })
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.agregarHeader(request));
  }

  agregarHeader(request:HttpRequest<unknown>) {
    const token:string | null=this.auth.getToken();
    if (token!==null) {
      return request.clone({
        setHeaders:{
          token: token,
          username: this.username
        }
      })
    } else {
      return request.clone({
        setHeaders:{
          token: '',
          username: ''
        }
      })
    }
  }
}