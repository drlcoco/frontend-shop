import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/interfaces/i-user';
import { StorageService } from 'src/app/services/storage.service';
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
    private storageService: StorageService,
    private productosService:ProductsService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.productosService.getEventos().subscribe(
      resp =>{
        this.productos = resp;
        console.log('...Cargando '+resp.length);
      }
    );
  }

}
