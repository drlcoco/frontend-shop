import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../interfaces/i-product';
import { ProductsService } from '../services/products.service';
import { StorageService } from '../services/storage.service';

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

  addedProducts:IProduct[] = [];
  @Input() productosAdd:number = 0;
  user:string = 'David';

  constructor(private productosService:ProductsService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.productosService.disparador.subscribe(data => {
      console.log(data);
      this.addedProducts.push(data);
      this.productosService.setNumbadge(this.addedProducts.length);
    })
  }

  updateBadge(){
    /* this.productosAdd = this.productosService.printBadge(); */
    this.productosAdd = this.storageService.getCart().length;
    return this.productosAdd;
  }

}
