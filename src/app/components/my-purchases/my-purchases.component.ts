import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/i-product';
import { IPurchase } from 'src/app/interfaces/i-purchase';
import { IUser } from 'src/app/interfaces/i-user';
import { ProductsService } from 'src/app/services/products.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-purchases',
  templateUrl: './my-purchases.component.html',
  styleUrls: ['./my-purchases.component.css']
})
export class MyPurchasesComponent implements OnInit {

  auth: IUser | undefined;
  product: IProduct | undefined;
  products: IProduct[] = [];
  myPurchases: IProduct[] = [];
  precioTotal:number = 0;
  date!: Date | undefined;
  theme: boolean = false;

  constructor(private userService: UserService,
    private productsService: ProductsService,
    private storageService: StorageService) { }

  ngOnInit(): void {
    if(this.userService.existAuth()){
      this.auth = this.userService.getAuth();
      const id = this.auth.id;
      console.log(this.auth.id);
      this.productsService.getPurchases().subscribe(
        resp =>{
          this.products = resp;
          console.log('...Cargando '+resp.length);
          this.products.forEach(element => {
            if(element.userId === id){
              this.date = element.created_at;
              console.log(this.date);
              this.myPurchases.push(element);
              console.log(element);
            }
          });
          return this.myPurchases;
        }
      );
    }
  }

  calcularTotal(){
    this.precioTotal = 0;
    if(this.myPurchases && this.myPurchases.length){
      for(let i = 0; i < this.myPurchases.length; i++) {
        this.precioTotal += this.myPurchases[i].price;
      }
    }
    return this.precioTotal;
  }

  updateTableTheme(): boolean {
    this.theme = this.storageService.getDarkTheme();
    return this.theme;
  }

}
