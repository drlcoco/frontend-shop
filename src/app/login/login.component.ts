import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { IUser } from '../interfaces/i-user';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { JwtInterface } from '../interfaces/jwt-interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  socialUser: SocialUser | undefined;
  loggedIn: boolean | undefined;
  pageTitle:string = "Regístrate";
  private token: string = '';
  private expires: string = '';
  private id: string = '';
  private user: string = '';

  userToShow: IUser | undefined ={
    name:"",
    surname:"",
    phone:0,
    address:"",
    role:"user",
    email:"",
    password:"",
    image:""
  };
  localUser:IUser ={
    name:"",
    surname:"",
    phone:0,
    address:"",
    role:"user",
    email:"",
    password:"",
    image:""
  };

  constructor(private authService: SocialAuthService, private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.socialUser = user;
      this.loggedIn = (user != null);
      this.redirect();
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  redirect(){
    this.router.navigate(["/products"]);
  }

  sendLogin(){
    if(this.localUser){
      /* this.userToShow = Object.assign({}, this.localUser); */
      this.userService.login(this.localUser).subscribe(
        (res)=>{
          this.userService.loggedUser = res.user;
          this.token = res['access_token'];
          this.expires = res.expires_in;
          this.localUser = res.user
          this.user = JSON.stringify(res.user);
          this.saveToken(this.token, this.expires, this.user);
          this.userService.eventEmitter.emit(this.localUser);
          setTimeout(() => {
            this.userService.logout();
            this.userService.eventEmitter.emit(this.userToShow = undefined);
          }, (6000 * 60));
        },
        (error)=> {
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: 'Los datos no son válidos!.',
            timer: 4000
          })
          /* this.localUser = {
            name:"",
            surname:"",
            phone:0,
            address:"",
            role:"",
            email:"",
            password:"",
            image:""
          }; */
        }
      )
    }
  }

  private saveToken(token:string, expires:string, auth:string) {
    localStorage.setItem('access_token', token);
    localStorage.setItem('expires_in', expires);
    localStorage.setItem('auth', auth);
    this.token = token;
    this.expires = expires;
    this.user = auth;
  }

}
