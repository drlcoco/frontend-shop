import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/interfaces/i-user';
import { IProduct } from '../../interfaces/i-product';
import { ProductsService } from '../../services/products.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('animateList', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-500px)'}),
        animate('5000ms ease-out', style({opacity: 1, transform: 'none'}))
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

export class HomeComponent implements OnInit {

  public enterState: string = 'void';
  private idn: number = 0;
  productos: IProduct[] = [];
  private id: string = '';
  user: any ={
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
    private route:ActivatedRoute,
    private productosService:ProductsService,
    private userService: UserService) { }

  ngOnInit(): void {
    /* this.user = this.userService.getLoggedUser();
    if(!this.user && this.existId()){
      this.idn = this.getId();
      console.log(this.idn);

      this.user = this.userService.getUser(this.idn).subscribe(
        (res)=> {
          this.userService.loggedUser = this.user;
          this.userService.eventEmitter.emit(this.user);
          setTimeout(() => {
            this.userService.logout();
            this.userService.eventEmitter.emit(this.user = undefined);
          }, (6000 * 60));
        },
        (error)=> {
          console.log(error);
        }
      );
    } */
    this.productosService.getEventos().subscribe(
      resp =>{
        this.productos = resp;
        console.log('...Cargando '+resp.length);
      }
    )
  }

  private getId(): number{
    if(this.existId()){
      this.id == localStorage.getItem('id');
      this.idn = Number(this.id);
    }
    return this.idn;
  }

  existId(): boolean {
    return localStorage.getItem('id') != null;
  }

}
