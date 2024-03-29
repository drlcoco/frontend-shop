import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, tap, map, retry } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { IUser } from '../interfaces/i-user';
import { JwtInterface } from '../interfaces/jwt-interface';
import { Responses } from '../interfaces/responses';
import { UserResponses } from '../interfaces/userResponses';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  AUTH_SERVER: string = 'https://apirest.patinetesdriveelectric.com/public/api';
  authSubject = new BehaviorSubject(false);
  private token: string = '';
  url:string = "https://apirest.patinetesdriveelectric.com/public/api/users";
  user: IUser | undefined;
  loggedUser: any | undefined;

  @Output() eventEmitter:EventEmitter<IUser> = new EventEmitter();

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  register(user: IUser): Observable<IUser>{
    return this.http.post<any>("https://apirest.patinetesdriveelectric.com/public/api/register" , user).pipe(
			tap((res) => {
        if(res){
          this.router.navigate(["/products"]);
        }
      }),
      catchError((resp: HttpErrorResponse) =>
        throwError(
          `Error insertando usuario: Código de servidor: ${resp.status}. Mensaje: ${resp.message}`
        )
      )
		);
  }

  login(user: IUser): Observable<any>{
    return this.http.post<any>(`${this.AUTH_SERVER}/login`, user).pipe(
      tap(
        (res) => {
          if(res){
            this.loggedUser = res;
            console.log(res);
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

  getEventos(): Observable<IUser[]> {
    const userURL = 'https://apirest.patinetesdriveelectric.com/public/api/users';
    return this.http.get<IUser[]>(userURL).pipe(
      map(response => response),
      catchError(
        (resp:HttpErrorResponse)=> throwError(`Error obteniendo
        usuarios. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)
      )
    );
  }

  getUser(id:number | undefined) {
    const userURL = 'https://apirest.patinetesdriveelectric.com/public/api/users';
    return this.http.get<any>(`${userURL}/${id}`);
  }

  updateUser(user: IUser): Observable<IUser> {
    const token = localStorage.getItem('access_token');
    return this.http.put<UserResponses>(`https://apirest.patinetesdriveelectric.com/public/api/users/${user.id}`, user).pipe(
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

  deleteUser(id:number){
    return this.http.delete<UserResponses>(`https://apirest.patinetesdriveelectric.com/public/api/users/${id}`).subscribe(
      (result)=> {
        Swal.fire({
          title: 'Usuario Eliminado',
          icon: 'success',
          text: 'Se ha eliminado el producto con éxito!.',
          timer: 4000
        })
      },
      (error)=> {
        Swal.fire({
          title: 'Error Eliminando el usuario!',
          icon: 'error',
          text: 'No se ha eliminado el usuario con éxito!.',
          timer: 4000
        })
      }
    )
  }

  getLoggedUser(){
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

