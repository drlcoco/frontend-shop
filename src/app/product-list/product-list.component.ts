import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  animations: [
    trigger('animateList', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100px)'}),
        animate('5000ms ease-out', style({opacity: 1, transform: 'none'}))
      ])
    ])
  ]
})
export class ProductListComponent implements OnInit {
  title:string = 'Mi lista de productos';
  headers = {description:'Producto', price:'Precio', available:'Disponible'};

  constructor() { }

  ngOnInit(): void {
  }

}
