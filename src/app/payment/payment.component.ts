import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../interfaces/i-product';
import { ProductsService } from '../services/products.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @Input() producto: IProduct = {
    id: 0,
    title: "",
    description: "",
    stock: 0,
    price: 0,
    image: "",
    userId: 1,
    categoryId: 1
  };
  productosAPagar:IProduct[] = [];
  cantidad:number = 1;
  precioTotal:number = 0;

  constructor(private productosService:ProductsService, private storageService: StorageService) { }

  ngOnInit(): void {
    if(this.storageService.existCart()) {
      this.productosAPagar = this.storageService.getCart();
      this.productosService.productos = this.storageService.getCart();
    }
  }

  calcPrice (){
    while(this.cantidad > 0){
      this.productosAPagar.push(this.producto);
      this.cantidad--;
    }
    if(this.productosAPagar){
      for (let index = 0; index < this.productosAPagar.length; index++) {
        const element = this.productosAPagar[index];
        this.precioTotal += element.price * this.cantidad;
      }
    }
    return this.precioTotal;
  }

  calcularTotal(){
    this.precioTotal = 0;
    for(let i = 0; i < this.productosAPagar.length; i++)
    {
      this.precioTotal += this.productosAPagar[i].price;
    }
    return this.precioTotal;
  }

}

