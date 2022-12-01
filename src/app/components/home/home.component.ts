import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  productos: IProduct[] = [];
  user: any | undefined;

  constructor(
    private route:ActivatedRoute,
    private productosService:ProductsService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getLoggedUser();
    if(!this.user){
      localStorage.removeItem('cart');
    }
    this.productosService.getEventos().subscribe(
      resp =>{
        this.productos = resp;
        console.log('...Cargando '+resp.length);
      }
    )
  }

}
