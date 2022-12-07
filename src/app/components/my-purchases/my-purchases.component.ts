import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/i-product';
import { IPurchase } from 'src/app/interfaces/i-purchase';
import { IUser } from 'src/app/interfaces/i-user';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-purchases',
  templateUrl: './my-purchases.component.html',
  styleUrls: ['./my-purchases.component.css']
})
export class MyPurchasesComponent implements OnInit {

  auth: IUser | undefined;
  product: IProduct | undefined;
  products: IProduct[] | undefined;
  myPurchases: IProduct[] = [];

  constructor(private userService: UserService,
    private productsService: ProductsService) { }

  ngOnInit(): void {
    this.auth = this.userService.getAuth();
    console.log(this.auth.id);
    /* this.productsService.get */
    this.productsService.getEventos().subscribe(
      resp =>{
        this.products = resp;
        console.log('...Cargando '+resp.length);
        if(this.auth !== undefined){
          this.products.forEach(element => {
            if(element.userId === this.auth?.id){
              this.myPurchases.push(element);
            }
            console.log(element);

          });
        }
      }
    );
    /* if(this.products && this.products.length){
      console.log(this.auth.id);

      this.products.forEach(element => {
        if(element.userId === this.auth?.id){
          this.myPurchases.push(element);
          console.log(element);
        }
      });
    } */
  }

}
