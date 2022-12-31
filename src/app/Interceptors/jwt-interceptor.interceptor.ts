import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    /* const token: string = this.cookieService.get('token');
    let req = request;
    if (token) {
      req = request.clone ( update: {
        setHeaders:{
          authorization:`Bearer ${token}`
        }
      }
    } */
    
    return next.handle(request);
  }
}
