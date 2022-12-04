import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { IUser } from './interfaces/i-user';
import { ProductsService } from './services/products.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'driveElectric';
  usuarios = [];
  badgeNum = 0;
  auth: any = '';
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

  /* constructor(private authService: AuthService){} */
  constructor(private productosService:ProductsService, private userService: UserService) { }
  ngOnInit(): void {

  }
}

