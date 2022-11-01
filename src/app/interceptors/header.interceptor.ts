import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.agregarHeader(request));
  }

  agregarHeader(request:HttpRequest<unknown>) {
    const token:string | null=this.auth.getToken();
    const username:string|null=this.auth.getUsername();
    if (token!==null && username!== '') {
      return request.clone({
        setHeaders:{
          token: token,
          username: username
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

