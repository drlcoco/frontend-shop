/* import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast'; */
import { EventEmitter, Injectable, Output } from '@angular/core';
import { IProduct } from '../interfaces/i-product';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  productos : IProduct[] = [];
  badgeNumber: number = 0;
  @Output() disparador:EventEmitter<any> = new EventEmitter();

  existCart(): boolean {
    return localStorage.getItem('cart') != null;
  }

  setCart(cart: IProduct[]): void{
    localStorage.setItem('cart', JSON.stringify(cart));
    this.badgeNumber = JSON.parse(localStorage.getItem('cart') || "[]").length;
    this.disparador.emit(this.badgeNumber);
    console.log(this.badgeNumber);

    this.disparador.emit(this.badgeNumber);
  }

  getCart(): IProduct[] {
    return JSON.parse(localStorage.getItem('cart') || "[]");
  }

  clear(): void {
    localStorage.removeItem('cart');
  }

  deleteProduct(id:number){
    for(let i = 0; i < this.productos.length; i++)
    {
        if(id == this.productos[i].id){
          this.productos.splice(i,1);
          console.log(this.productos);
          this.badgeNumber = this.productos.length;
          break;
        }
    }
    console.log(this.productos.length);
    return this.productos.length;
  }
}
