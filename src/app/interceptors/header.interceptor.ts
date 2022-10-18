import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.agregarHeader(request));
  }

  agregarHeader(request:HttpRequest<unknown>) {
    const mensaje:string='Mensaje interceptado :D';
    return request.clone({
      setHeaders:{
        msg: mensaje
      }
    })
  }
}

