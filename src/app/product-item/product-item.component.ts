import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../interfaces/i-product';
import { ProductsService } from '../services/products.service';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
  animations: [
    trigger('animateList', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-300px)'}),
        animate('5000ms ease-out', style({opacity: 1, transform: 'none'}))
      ])
    ])
  ]
})
export class ProductItemComponent implements OnInit {

  @Input() inputProducto:IProduct = {
    id:0,
    title:'',
    description: "",
    stock: 0,
    price: 0,
    image: '',
    userId: 1,
    categoryId: 1
  };

  @Output() addedProducts:IProduct[] = [];

  productosAdd:number = 0;
  imgHeight:number = 200;

  constructor(private productosService:ProductsService,
              private router:Router,
              private route:ActivatedRoute,
              private storageService: StorageService,
              private userService: UserService) { }

  ngOnInit(): void {
    if(this.storageService.existCart()) {
      this.addedProducts = this.storageService.getCart();
      this.productosService.productos = this.storageService.getCart();
    }
  }

  addProduct(){
    this.addedProducts.push(this.inputProducto);
    this.productosService.disparador.emit(this.inputProducto);
    this.storageService.setCart(this.productosService.productos);
  }

  deleteProduct(){
    this.productosService.deleteEvent(this.inputProducto.id as number);
    alert('Se ha eliminado correctamente!!!');
    this.router.navigate(['../home']);
  }

  updateProduct(){

  }

  updateBadge(){
    this.productosAdd = this.productosService.productos.length;
    return this.productosAdd;
  }

  offer(price: number){
    price = price * 1.1;
    return price.toFixed(2);
  }

}
