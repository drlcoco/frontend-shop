import { Component, OnInit } from '@angular/core';
import { IProduct } from '../interfaces/i-product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.css']
})
export class ProductShowComponent implements OnInit {

  productos: IProduct[] = [];

  filterSearch: string = '';
  ProductsService: any;

  constructor(private productosService : ProductsService) {}

  ordenarStock(enlaceEvento: Event) {
    enlaceEvento.preventDefault();
    this.filterSearch = "";
    this.productos.sort((a,b)=>{
      return a.stock - b.stock;
    })
  }

  ordenarPrecio(enlaceEvento: Event) {
    enlaceEvento.preventDefault();
    this.filterSearch = "";
    this.productos.sort((a,b)=>{
      return a.price - b.price;
    })
  }

  ngOnInit(): void {
    this.productosService.getEventos().subscribe(
      resp =>{
        console.log(resp);
        this.productos = resp;
        console.log('...Cargando '+this.productos);
      },
      error =>{console.log(error);
      }
    )
  }
  
}
