import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IProduct } from '../interfaces/i-product';
import { CartServiceService } from '../services/cart-service.service';
import { ProductsService } from '../services/products.service';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productoDetails: IProduct = {
    id: 0,
    title: '',
    description: '',
    stock: 0,
    price: 0,
    image: '',
    userId: 1,
    categoryId: 1,
  };
  id: number = this.route.snapshot.params['id'];
  authUser: any | undefined;
  addedProducts: IProduct[] = [];

  constructor(
    private productsService: ProductsService,
    private cartService: CartServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'] as number; // Recibimos parámetro
    this.productoDetails.id = id;
    this.productsService.getEvento(id).subscribe(
      (p) => (this.productoDetails = p),
      (error) => console.log('Error')
    );
    if (this.userService.existAuth()) {
      this.authUser = this.userService.getAuth();
    }
  }

  addProductCart() {
    this.cartService.addToCart(this.productoDetails);
  }

  deleteProduct() {
    console.log(this.route.snapshot.params['id']);
    this.productsService.deleteEvent(this.route.snapshot.params['id']);
  }

  offer(price: number) {
    price = price * 1.1;
    return price.toFixed(2);
  }

  getUser() {
    if (this.userService.existAuth()) {
      this.authUser = this.userService.getAuth();
      this.router.navigate(['/payment']);
    } else {
      this.authUser = undefined;
      this.router.navigate(['/login']);
    }
  }
}
