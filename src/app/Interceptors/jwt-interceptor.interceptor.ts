import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token: string = localStorage.getItem('access_token') || '[]';
    let req = request;
    if (token) {
      req = request.clone ( {
        setHeaders:{
          'Content-type' : 'application/json',
          'Accept' : 'application/json',
          'Authorization':`Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
