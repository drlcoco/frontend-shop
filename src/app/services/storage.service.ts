import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/i-product';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

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
}
