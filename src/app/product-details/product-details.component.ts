import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
/* import Swal from "sweetalert2";
 */import Swal from 'sweetalert2/dist/sweetalert2.js';
import { IProduct } from '../interfaces/i-product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {

  productoDetails: IProduct = {
    id:0,
    title:'',
    description:'',
    stock:0,
    price:0,
    image:'',
    userId: 1,
    categoryId: 1
  }
  constructor(private productsService: ProductsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"] as number; // Recibimos parámetro
    this.productoDetails.id = id;
    this.productsService.getEvento(id)
      .subscribe(
        p => this.productoDetails = p,
        error => console.log("Error")
      );
  }

  deleteProducto(){
    console.log(this.route.snapshot.params["id"]);

    this.productsService.deleteEvent(this.route.snapshot.params["id"]);
    alert('Se ha eliminado correctamente!!!');
  }

  offer(price: number){
    price = price * 1.1;
    return price.toFixed(2);
  }

}
