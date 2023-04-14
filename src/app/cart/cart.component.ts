import { Component, Input, OnInit, Output, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { IProduct } from '../interfaces/i-product';
import { IUser } from '../interfaces/i-user';
import { CartServiceService } from '../services/cart-service.service';
import { ProductsService } from '../services/products.service';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  addedProducts: IProduct[] = [];
  badgeNumber = 0;
  total: number = 0;
  user: IUser | undefined;

  constructor(
    private productosService: ProductsService,
    private cartService: CartServiceService,
    private storageService: StorageService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.cartService.productsObs.subscribe(
      data => this.addedProducts = data
    );
    if(this.userService.existAuth()){
      this.user = this.userService.getAuth();
    }
    this.badgeNumber = this.addedProducts.length;
  }

  borrarItem(product: IProduct) {
    this.cartService.deleteCartProduct(product);
  }

  calcularTotal() {
    this.total = 0;
    for (let i = 0; i < this.addedProducts.length; i++) {
      this.total += this.addedProducts[i].price;
    }
    return this.total;
  }

  getUser() {
    if (this.userService.existAuth()) {
      this.user = this.userService.getAuth();
      this.router.navigate(['/payment']);
    } else {
      this.user = undefined;
      this.router.navigate(['/login']);
    }
  }

}
