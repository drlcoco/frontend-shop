import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { Form, NgForm, Validators } from '@angular/forms';
import { IUser } from '../interfaces/i-user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  pageTitle:string = "Regístrate";
  isRegistered!: boolean;
  isEmailExist!: boolean;
  public password2: string = '';
  user:IUser = {
    name:"",
    surname:"",
    phone:0,
    address:"",
    role:"user",
    email:"",
    postalCode:"",
    password:"",
    password2:"",
    image:""
  };
  checkUser:IUser = {
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
    this.userToShow = Object.assign({}, this.user);
    this.user.address = (this.user.address + " CP: " + this.user.postalCode) as string;
    this.userService.register(this.user).subscribe(
      (result)=>{
        this.isRegistered = true;
        Swal.fire({
          title: 'Registro completado',
          icon: 'success',
          text: 'Se ha registrado con éxito!.',
          timer: 4000
        })
      },
      (error)=>{
        this.isRegistered = false;
        Swal.fire({
          title: 'Error registrando el usuario',
          icon: 'error',
          text: 'No se ha registrado el usuario correctamente.',
          timer: 4000
        })
        return this.user;
      }
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

  checkEmail() {
    console.log(this.user.email);
    this.checkUser = this.user;
    if(this.checkUser.email) {
      this.userService.checkEmail(this.checkUser).subscribe(
        (result)=>{
          this.isEmailExist = false;
          console.log(this.isEmailExist);
          console.log(result);
        },
        (error)=>{
          this.isEmailExist = true;
          console.log(error);
          return this.user;
        }
      )
    }
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
