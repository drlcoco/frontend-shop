import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";
import { IProduct } from '../interfaces/i-product';
import { ProductsService } from '../services/products.service';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';

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
  id: number = this.route.snapshot.params["id"];
  authUser: any | undefined;
  addedProducts:IProduct[] = [];

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private userService: UserService,
    private storageService: StorageService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"] as number; // Recibimos parámetro
    this.productoDetails.id = id;
    this.productsService.getEvento(id)
      .subscribe(
        p => this.productoDetails = p,
        error => console.log("Error")
      );
    this.authUser = this.userService.getLoggedUser();
  }

  addProduct(){
    this.storageService.disparador.emit(this.productoDetails);
    /* this.storageService.setCart(this.productsService.productos); */
  }

  deleteProduct(){
    console.log(this.route.snapshot.params["id"]);
    this.productsService.deleteEvent(this.route.snapshot.params["id"]);
  }

  offer(price: number){
    price = price * 1.1;
    return price.toFixed(2);
  }

}
