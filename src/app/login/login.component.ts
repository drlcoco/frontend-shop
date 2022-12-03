import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { IUser } from '../interfaces/i-user';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { JwtInterface } from '../interfaces/jwt-interface';
import Swal from "sweetalert2";


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

  userToShow: IUser ={
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
      console.log(this.socialUser);

      this.loggedIn = (user != null);
      this.redirect();
    });
  }

  /* onSubmit(form: Form){
    console.log(this.localUser);
  } */

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
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
          console.log(res);
          /* this.localUser = res.dataUser; */
          this.token = res.token;
          this.saveToken(this.token);
          this.userService.eventEmitter.emit(res);
        },
        (error)=> {
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: 'Los datos no son válidos!.',
            timer: 4000
          })
          this.localUser = {
            name:"",
            surname:"",
            phone:0,
            address:"",
            role:"",
            email:"",
            password:"",
            image:""
          };
        }
      )
    }
  }

  private saveToken(token:string): void{
    localStorage.setItem('token', token);
    this.token = token;
  }

  // Example starter JavaScript for disabling form submissions if there are invalid fields
  function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event: { preventDefault: () => void; stopPropagation: () =>   void; }) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }

          form.classList.add('was-validated')
        }, false)
      })
  }

}
