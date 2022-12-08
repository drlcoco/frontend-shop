import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { IProduct } from '../interfaces/i-product';
import { IUser } from '../interfaces/i-user';
import { ProductsService } from '../services/products.service';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CartServiceService } from '../services/cart-service.service';


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
  @Input() productosAdd:number = 0;
  addedProducts: IProduct[] = [];
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
    private cartService: CartServiceService,
    private userService: UserService,
    private storageService: StorageService,
    private authService: SocialAuthService,
    private http: HttpClient) { }

  ngOnInit(): void {

    if (this.storageService.existCart()) {
      this.addedProducts = this.storageService.getCart();
      this.addedProducts.forEach(element => {
        this.cartService.addToCart(element);
      });
      this.productosService.productos = this.storageService.getCart();
    }
    /* if(this.storageService.existCart()) {
      this.addedProducts = this.cartService.loadProducts();
    } */
    /* this.storageService.disparador.subscribe(data => {
      this.productosService.productos = this.storageService.getCart();
      this.updateBadge();
      console.log(this.productosService.productos.length);


    }); */
    this.cartService.productsObs.subscribe(
      data => this.addedProducts = data
    );
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.userService.loggedUser = user;
    });
    if(this.userService.existAuth()){
      this.authUser = this.userService.getAuth();
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
    return this.addedProducts.length;
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
}
