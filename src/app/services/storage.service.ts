/* import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast'; */
import { EventEmitter, Injectable, Output } from '@angular/core';
import { IProduct } from '../interfaces/i-product';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  product : IProduct = {
    id: 0,
    title: '',
    description: '',
    stock: 0,
    price: 0,
    image: '',
    userId: 1,
    categoryId: 1,
  };
  productos : IProduct[] = [];
  badgeNumber: number = 0;
  disparador:EventEmitter<IProduct> = new EventEmitter();
  /* disparador = new Subject<IProduct>(); */

  existCart(): boolean {
    return localStorage.getItem('cart') != null;
  }

  setCart(cart: IProduct[]): void{
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCart(): IProduct[] {
    return JSON.parse(localStorage.getItem('cart') || "[]");
  }

  clear(): void {
    localStorage.removeItem('cart');
  }

  sendProduct(product: IProduct) {
    this.disparador.emit(product);
  }
}
