import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, tap, map, retry } from 'rxjs/operators';

import { IUser } from '../interfaces/i-user';
import { JwtInterface } from '../interfaces/jwt-interface';
import { Responses } from '../interfaces/responses';
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

  @Output() eventEmitter:EventEmitter<IUser> = new EventEmitter();

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

  getUser(id:number | undefined) {
    /* const userURL = 'http://localhost:8000/api/users';
    return this.http.get<IUser>(`${userURL}/${id}`).pipe(
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
    ); */
    const userURL = 'http://localhost:8000/api/users';
    return this.http.get<any>(`${userURL}/${id}`);
  }

  updateUser(user: IUser): Observable<IUser> {
    const token = localStorage.getItem('access_token');
    return this.http.put<UserResponses>(`http://localhost:8000/api/users/${user.id}`, user).pipe(
			map(resp => {
        console.log("Usuario actualizado correctamente... "+resp);
				return resp.user;
			}),
      catchError((resp: HttpErrorResponse) =>
        throwError(
          `Error insertando user: Código de servidor: ${resp.status}. Mensaje: ${resp.message}`
        )
      )
		);
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
    console.log(this.loggedUser);

    return this.loggedUser;
  }

  logout(): void {
    this.loggedUser = undefined;
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('auth');
    this.user = undefined
    this.eventEmitter.emit(this.user);
    this.router.navigate(["/products"]);
  }

  getAuth(): IUser{
    const user = JSON.parse(localStorage.getItem('auth') || '');
    return user;
  }

  existAuth(): boolean {
    if(localStorage.getItem('auth') !== null && localStorage.getItem('auth') !== '' && localStorage.getItem('auth') !== undefined){
      return true;
    }
    return false;
  }

  timeLogout(){
    setTimeout(() => {
      this.logout();
    }, (60000 * 60));
  }

}

