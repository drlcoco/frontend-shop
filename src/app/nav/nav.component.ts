import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../interfaces/i-product';
import { IUser } from '../interfaces/i-user';
import { ProductsService } from '../services/products.service';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  animations: [
    trigger('animateList', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-500px)'}),
        /* animate('1000ms ease-out', style({opacity: 1, transform: 'rotate(20deg)'})) */
        animate("2s 10ms cubic-bezier(.17,.67,.88,.1)")
      ])
    ]),
    trigger('animateImage', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100px)'}),
        animate('1000ms ease-out', style({opacity: 1, transform: 'none'}))
      ])
    ])
  ]
})
export class NavComponent implements OnInit {

  AUTH_SERVER: string = 'http://localhost:8000/api';
  addedProducts:IProduct[] = [];
  numBadge:number = 0;
  @Input() productosAdd:number = 0;
  user: SocialUser | undefined;
  iuser:IUser | undefined;
  authUser: any | undefined;
  loggedIn: boolean | undefined;
  localIn: boolean | undefined;
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

  constructor(
    private productosService:ProductsService,
    private userService: UserService,
    private storageService: StorageService,
    private authService: SocialAuthService,
    private http: HttpClient) { }

  ngOnInit(): void {
    if(this.storageService.existCart()) {
      this.addedProducts = this.storageService.getCart();
      this.productosService.productos = this.addedProducts;
    }
    this.storageService.disparador.subscribe(data => {
      this.numBadge = data;
      this.updateBadge();
    });
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    this.userService.eventEmitter.subscribe(data => {
      console.log(data);

      this.authUser = data;
      this.loggedIn = (this.authUser != null);
    });
    if(this.existAuth()){
      console.log("Recuperando el usuario autorizado del localstorage");
      console.log(this.getAuth());
      this.authUser = this.getAuth();
    }
  }

  updateBadge(): number{
    this.addedProducts = this.storageService.getCart();
    return this.addedProducts.length;
  }

  setAuthName(data: any){
    this.authUser = data;
    console.log(this.authUser);

    return this.authUser.image;
  }

  signOut(): void {
    if(this.authUser){
      this.userService.logout();
    }else{
      this.authService.signOut();
    }
  }

  private getAuth(): IUser{
    this.localUser = JSON.parse(localStorage.getItem('auth') || '');
    return this.localUser;
  }

  existAuth(): boolean {
    return localStorage.getItem('auth') != null;
  }
}