import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/i-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:string = "https://127.0.0.1:8000/api/";

  constructor(private http: HttpClient) { }

  register(user:IUser): Observable<any>{
    let json = JSON.stringify(user);
    let params = 'json'+json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url+'register', params, {headers: headers});
  }


}
