import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../interfaces/i-product';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  private products: IProduct[] = [];
  private productsSubject: BehaviorSubject<IProduct[]> = new BehaviorSubject(this.products);
  public productsObs: Observable<IProduct[]> = this.productsSubject.asObservable();

  constructor(private storageService: StorageService) { }

  addToCart(product: IProduct){
    this.products.push(product);
    this.storageService.setCart(this.products);
  }

  deleteCartProduct(product: IProduct) {
    for (let i = 0; i < this.products.length; i++) {
      if (product.id === this.products[i].id) {
        this.products.splice(i, 1);
        this.storageService.setCart(this.products);
        break;
      }
    }
  }

  loadProducts(){
    if(this.products.length = 0){
      this.products = this.storageService.getCart();
      console.log(this.products);
    }
    return this.products;
  }
}
