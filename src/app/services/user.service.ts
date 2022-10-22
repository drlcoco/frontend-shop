import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/operators';

import { IUser } from '../interfaces/i-user';
import { UserResponses } from '../interfaces/userResponses';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:string = "https://127.0.0.1:8000/api/users";

  constructor(private http: HttpClient) { }

  register(user: IUser): Observable<IUser>{
    console.log(user);
    /* let json = JSON.stringify(user);
    let params = 'json'+json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url, params, {headers: headers}); */
    return this.http.post<UserResponses>('http://localhost:8000/api/users' , user).pipe(
			map(resp => {
				return resp.user;
			}),
      catchError((resp: HttpErrorResponse) =>
        throwError(
          `Error insertando usuario: Código de servidor: ${resp.status}. Mensaje: ${resp.message}`
        )
      )
		);
  }


}
