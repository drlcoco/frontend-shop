import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from './interfaces/i-user';
import { JwtInterface } from './interfaces/jwt-interface';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVER: string = 'http://localhost:8000/api';
  authSubject = new BehaviorSubject(false);
  private token: string = '';

  constructor(private httpClient: HttpClient) { }

}



