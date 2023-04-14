import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../interfaces/i-product';
import { IUser } from '../interfaces/i-user';

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
  private darkTheme: boolean = false;
  private darkThemeSubject: BehaviorSubject<boolean> = new BehaviorSubject(this.darkTheme);
  public darkThemeObs: Observable<boolean> = this.darkThemeSubject.asObservable();

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

  setDarkTheme(bool: boolean){
    this.darkTheme = bool;
    console.log("cambiando el tema "+this.darkTheme);
  }

  getDarkTheme(){
    return this.darkTheme;
  }
}
