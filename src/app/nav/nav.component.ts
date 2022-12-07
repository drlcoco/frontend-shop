import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, Output, OnDestroy } from '@angular/core';
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
export class NavComponent implements OnInit, OnDestroy {

  AUTH_SERVER: string = 'http://localhost:8000/api';
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
  ngOnDestroy(): void {



  }

  ngOnInit(): void {
    /* if(this.storageService.existCart()) {
      this.productosService.productos = this.storageService.getCart();
    } */
    /* this.storageService.disparador.subscribe(data => {
      this.productosService.productos = this.storageService.getCart();
      this.updateBadge();
      console.log(this.productosService.productos.length);


    }); */
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.userService.loggedUser = user;
    });
    if(this.existAuth()){
      this.authUser = this.getAuth();
    }else{
      this.authUser = undefined;
    }
    this.userService.eventEmitter.subscribe(data => {
      this.authUser = data;
      this.loggedIn = (this.authUser != null);
      this.userService.loggedUser = data;
    });
  }
  ngDestroy(){

  }

  updateBadge(): number{
    /* this.productosService.productos = this.storageService.getCart();
    this.addedProducts = this.productosService.productos; */
    return this.storageService.getCart().length;
  }

  signOut(): void {
    this.authService.signOut();
  }

  logout(){
    this.iuser = undefined;
    this.authUser = undefined;
    this.loggedIn = false;
    this.localIn = false;
    this.localUser ={
      name:"",
      surname:"",
      phone:0,
      address:"",
      role:"user",
      email:"",
      password:"",
      image:""
    };
    this.userService.loggedUser = null;
    this.userService.logout();
  }

  private getAuth(): IUser{
    this.localUser = JSON.parse(localStorage.getItem('auth') || '');
    return this.localUser;
  }

  existAuth(): boolean {
    if(localStorage.getItem('auth') !== null && localStorage.getItem('auth') !== '' && localStorage.getItem('auth') !== undefined){
      return true;
    }
    return false;
  }
}
