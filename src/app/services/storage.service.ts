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

  saveToken(token:string, expires:string, auth:string) {
    localStorage.setItem('access_token', token);
    localStorage.setItem('expires_in', expires);
    localStorage.setItem('auth', auth);
  }

  getToken(){
    return localStorage.getItem('access_token');
  }
}
