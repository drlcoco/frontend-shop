import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  base = environment.base;

  constructor(private http:HttpClient) { }

  /* getUser(){
    return this.http.get(url: `$(this.base)users`);
  } */
}



