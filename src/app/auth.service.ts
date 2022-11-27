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

  /* register(user: IUser): Observable<JwtInterface>{
    return this.httpClient.post<JwtInterface>(`${this.AUTH_SERVER}/users`, user).pipe(
      tap(
        (res: JwtInterface) => {
          if(res){
            this.saveToken(res.dataUser.token, res.dataUser.expire);
          }
        }
      )
    );
  } */

  /* login(user: IUser): Observable<JwtInterface>{
    return this.httpClient.post<JwtInterface>(`${this.AUTH_SERVER}/login`, user).pipe(
      tap(
        (res: JwtInterface) => {
          if(res){
            console.log(res);

            this.saveToken(res.dataUser.token, res.dataUser.expire);
          }else{
            console.log("No estoy entrando en res");

          }
        }
      )
    );

  }*/

  /* logout(): void {
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('expires_in');
  }

  private saveToken(token:string, expires_in:string): void{
    localStorage.setItem('token', token);
    localStorage.setItem('expires_in', expires_in);
    this.token = token;
  }

  private getToken(): string{
    if(!this.token){
      this.token == localStorage.getItem('token');
    }
    return this.token;
  } */
}



