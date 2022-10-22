import { Component, Input, OnInit, Output } from '@angular/core';
import { of } from 'rxjs';
import { IProduct } from '../interfaces/i-product';
import { ProductsService } from '../services/products.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Output() addedProducts:IProduct[] = [];
  badgeNumber = 0;
  total:number = 0;

  constructor(private productosService:ProductsService, private storageService: StorageService) { }

  ngOnInit(): void {
    if(this.storageService.existCart()) {
      this.addedProducts = this.storageService.getCart();
      this.productosService.productos = this.storageService.getCart();
    }
    this.productosService.disparador.subscribe(data => {
      console.log(data);
      this.productosService.addProduct(data);
      this.addedProducts.push(data);
      console.log(this.addedProducts);
      /* this.total += data.price; */
      this.calcularTotal();
    })

    this.badgeNumber = this.addedProducts.length;
  }

  obtenerItem(){
    this.storageService.setCart(this.addedProducts);
  }

  borrarItem(product:IProduct){
    for(let i = 0; i < this.addedProducts.length; i++)
    {
        if(product.id == this.addedProducts[i].id){
          this.addedProducts.splice(i,1);
          this.productosService.deleteProduct(product.id as number);
          this.badgeNumber = this.addedProducts.length;
          /* this.productosService.setNumbadge(this.addedProducts.length); */
          this.productosService.setNumbadge(this.storageService.getCart().length);
          /* this.storageService.clear(); */
          this.storageService.setCart(this.productosService.productos);
          console.log(this.productosService.productos.length);
          console.log(this.storageService.getCart().length);


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

}
