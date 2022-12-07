import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interfaces/i-product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cardhome',
  templateUrl: './cardhome.component.html',
  styleUrls: ['./cardhome.component.css']
})
export class CardhomeComponent implements OnInit {

  productos: IProduct[] = [];

  @Input() inputProducto:IProduct = {
    id:0,
    title:'',
    description: "",
    stock: 0,
    price: 0,
    image: '',
    userId: 1,
    categoryId: 1
  };

  constructor(private route:ActivatedRoute, private productosService:ProductsService) { }

  ngOnInit(): void {
    /* this.productosService.getEventos().subscribe(
      resp =>{
        this.productos = resp;
        console.log('...Cargando '+resp.length);
      }
    ) */
  }

}
