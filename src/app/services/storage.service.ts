/* import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast'; */
import { EventEmitter, Injectable, Output } from '@angular/core';
import { IProduct } from '../interfaces/i-product';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  badgeNumber: number = 0;
  @Output() disparador:EventEmitter<any> = new EventEmitter();

  existCart(): boolean {
    return localStorage.getItem('cart') != null;
  }

  setCart(cart: IProduct[]): void{
    localStorage.setItem('cart', JSON.stringify(cart));
    this.badgeNumber = JSON.parse(localStorage.getItem('cart') || "[]").length;
    this.disparador.emit(this.badgeNumber);
  }

  getCart(): IProduct[] {
    return JSON.parse(localStorage.getItem('cart') || "[]");
  }

  clear(): void {
    localStorage.removeItem('cart');
  }
}
