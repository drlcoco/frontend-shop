import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { IProduct } from '../interfaces/i-product';
import { IUser } from '../interfaces/i-user';
import { ProductsService } from '../services/products.service';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Output() addedProducts:IProduct[] = [];
  badgeNumber = 0;
  total:number = 0;
  user: IUser | undefined;

  constructor(
    private productosService:ProductsService,
    private storageService: StorageService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.storageService.existCart()) {
      this.addedProducts = this.storageService.getCart();
      this.productosService.productos = this.storageService.getCart();
    }
    this.storageService.disparador.subscribe(data => {
      this.addedProducts = this.storageService.getCart();
      this.productosService.productos = this.storageService.getCart();
      this.productosService.addProduct(data);
      this.storageService.setCart(this.productosService.productos);
      this.addedProducts = this.productosService.productos;
      this.calcularTotal();
    });
    this.user = this.userService.getAuth();
    this.badgeNumber = this.addedProducts.length;
  }

  borrarItem(product:IProduct){
    for(let i = 0; i < this.addedProducts.length; i++)
    {
        if(product.id === this.addedProducts[i].id){
          this.productosService.deleteProduct(product.id as number);
          this.badgeNumber = this.addedProducts.length;
          this.storageService.setCart(this.productosService.productos);
          this.addedProducts = this.productosService.productos;
          break;
        }
    }
    return this.total;
  }

  calcularTotal(){
    this.total = 0;
    for(let i = 0; i < this.addedProducts.length; i++)
    {
      this.total += this.addedProducts[i].price;
    }
    return this.total;
  }

  getUser(){
    if(this.userService.existAuth()){
      this.user = this.userService.getAuth();
      this.router.navigate(['/payment']);
    }else{
      this.user = undefined;
      this.router.navigate(['/login']);
    }
  }

}
