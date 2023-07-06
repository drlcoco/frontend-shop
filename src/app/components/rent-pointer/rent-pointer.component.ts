import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/interfaces/i-product';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-rent-pointer',
  templateUrl: './rent-pointer.component.html',
  styleUrls: ['./rent-pointer.component.css'],
  animations: [
    trigger('animateList', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-300px)' }),
        animate('5000ms ease-out', style({ opacity: 1, transform: 'none' })),
      ]),
    ]),
  ]
})
export class RentPointerComponent implements OnInit {

  id: number = 0;
  imgHeight: number = 200;
  /* rentProduct: */
  @Input() inputProducto: IProduct = {
    id: 0,
    title: '',
    description: '',
    stock: 0,
    price: 0,
    image: '',
    userId: 1,
    categoryId: 1,
  };

  constructor(private route: ActivatedRoute,
    private productosService: ProductsService,
    private cartService: CartServiceService,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"] as number; // Recibimos parámetro
    this.id = id;
    console.log(id);
  }

  addProduct(){
    this.cartService.addToCart(this.inputProducto);
  }

  deleteProduct() {
    this.productosService.deleteEvent(this.inputProducto.id as number);
    alert('Se ha eliminado correctamente!!!');
    this.router.navigate(['../home']);
  }

  updateProduct() {}

  /* updateBadge() {
    this.productosAdd = this.productosService.productos.length;
    return this.productosAdd;
  } */

  offer(price: number) {
    price = price * 1.1;
    return price.toFixed(2);
  }

}
