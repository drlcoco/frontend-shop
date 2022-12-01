import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, tap, map, retry } from 'rxjs/operators';

import { IUser } from '../interfaces/i-user';
import { JwtInterface } from '../interfaces/jwt-interface';
import { UserResponses } from '../interfaces/userResponses';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  AUTH_SERVER: string = 'http://localhost:8000/api';
  authSubject = new BehaviorSubject(false);
  private token: string = '';
  url:string = "https://127.0.0.1:8000/api/users";
  user: IUser | undefined;
  loggedUser: any | undefined;

  @Output() eventEmitter:EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  register(user: IUser): Observable<IUser>{
    console.log(user);
    return this.http.post<UserResponses>('http://localhost:8000/api/users' , user).pipe(
			map(resp => {
        this.loggedUser = resp.user;
				return resp.user;
			}),
      catchError((resp: HttpErrorResponse) =>
        throwError(
          `Error insertando usuario: Código de servidor: ${resp.status}. Mensaje: ${resp.message}`
        )
      )
		);
  }
  /* register(user: IUser): Observable<JwtInterface>{
    console.log(user);
    return this.http.post<JwtInterface>(`${this.AUTH_SERVER}/users`, user).pipe(
      tap(
        (res: JwtInterface) => {
          if(res){
            this.saveToken(res.token);
          }else{
            console.log("Elseweeeeee");
          }
        }
      ),
      catchError((resp: HttpErrorResponse) =>
        throwError(
          `Error insertando usuario: Código de servidor: ${resp.status}. Mensaje: ${resp.message}`
        )
      )
		);
  } */

  login(user: IUser): Observable<any>{
    return this.http.post<any>(`${this.AUTH_SERVER}/login`, user).pipe(
      tap(
        (res) => {
          if(res){
            this.loggedUser = res;
            console.log(res);
            /* this.saveToken(res.dataUser.token); */
            this.router.navigate(["/products"]);
          }
        }
      ),
      catchError((resp: HttpErrorResponse) =>
        throwError(
          `Error recibiendo al usuario: Código de servidor: ${resp.status}. Mensaje: ${resp.message}`
        )
      )
    );
  }

  getUser(id:number) {
    let options = {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') as string)
    };
    const userURL = 'http://localhost:8000/api/users';
    return this.http.get<IUser>(`${userURL}/${id}`, options).pipe(
      retry(3),
      tap(res =>{
        this.user = res;
        console.log(res);
      }
        ),
      catchError(
        (res:HttpErrorResponse)=> throwError(`Error obteniendo
        usuario. Código de servidor: ${res.status}. Mensaje: ${res.message}`)
      )
    );
    /* const productoURL = 'http://localhost:8000/api/users';
    return this.http.get<any>(`${productoURL}/${id}`); */
  }

  /* login(user:IUser){
    const id = user.id;
    console.log(user);

    return this.http.post<JwtInterface>('http://localhost:8000/api/login', user).pipe(
			map(
        (res: JwtInterface) => {
          if(res){
            this.saveToken(res.dataUser.token, res.dataUser.expire);
          }
        },
      catchError((resp: HttpErrorResponse) =>
        throwError(
          `Error recibiendo al usuario: Código de servidor: ${resp.status}. Mensaje: ${resp.message}`
        )
      )
		));
  } */
  /* login(user:IUser){
    return this.http.post<JwtInterface>('http://localhost:8000/api/login' , user).pipe(
			map(res => {
        this.saveToken(res.dataUser.token);
        console.log(res);
        this.router.navigate(["/products"]);
			}),
      catchError((res: HttpErrorResponse) =>
        throwError(
          `Error recibiendo usuario: Código de servidor: ${res.status}. Mensaje: ${res.message}`
        )
      )
		);
  } */

  getLoggedUser(){
    return this.loggedUser;
  }

  logout(): void {
    this.loggedUser = undefined;
    this.token = '';
    localStorage.removeItem('token');
  }

  private saveToken(token:string): void{
    localStorage.setItem('token', token);
    this.token = token;
  }

  private getToken(): string{
    if(!this.token){
      this.token == localStorage.getItem('token');
    }
    return this.token;
  }

}

