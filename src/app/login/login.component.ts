import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { IUser } from '../interfaces/i-user';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { JwtInterface } from '../interfaces/jwt-interface';
import Swal from 'sweetalert2';
import { StorageService } from '../services/storage.service';

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
  private user: string = '';
  dark: boolean = false;

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

  constructor(private authService: SocialAuthService,
    private userService: UserService,
    private storageService: StorageService,
    private router:Router) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.socialUser = user;
      this.loggedIn = (user != null);
      this.redirect();
    });
    this.storageService.darkThemeObs.subscribe(
      data => {
        this.dark = data;
        console.log(data);
      }
    );
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
      this.userService.login(this.localUser).subscribe(
        (res)=>{
          this.userService.loggedUser = res.user;
          this.token = res['access_token'];
          this.expires = res.expires_in;
          this.localUser = res.user
          this.user = JSON.stringify(this.localUser);
          this.storageService.saveToken(this.token, this.expires, this.user);
          this.userService.eventEmitter.emit(this.localUser);
          this.userService.timeLogout();
        },
        (error)=> {
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: 'Los datos no son válidos!.',
            timer: 4000
          })
        }
      )
    }
  }

}
