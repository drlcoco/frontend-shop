import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { Form, NgForm, Validators } from '@angular/forms';
import { IUser } from '../interfaces/i-user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  pageTitle:string = "Regístrate";
  public password2: string = '';
  user:IUser = {
    name:"",
    surname:"",
    phone:0,
    address:"",
    role:"admin",
    email:"",
    password:"",
    password2:"",
    image:""
  };
  userToShow:IUser = {
    name:"",
    surname:"",
    phone:0,
    address:"",
    role:"user",
    email:"",
    password:"",
    password2:"",
    image:""
  };
  status: string = "";
  public preview: string | undefined;

  constructor(private userService: UserService, private route:ActivatedRoute) {
  }

  addUser(fileInput: HTMLInputElement){
    console.log(this.user);
    this.userToShow = Object.assign({}, this.user);
    console.log(this.userToShow);
    this.userService.register(this.user).subscribe(
      (result)=>{
        console.log(this.user);
      },
      (error)=>console.log("Los datos no son válidos!!!")
    )
    this.user = {
      name:"",
      surname:"",
      phone:0,
      address:"",
      role:"user",
      email:"",
      password:"",
      image:""
    };
  }

  changeImage(fileInput:HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', (e) => {
      this.user.image = reader.result as string;
      this.preview = reader.result as string;
    });
  }

}
