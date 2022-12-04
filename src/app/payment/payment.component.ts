import { Component, Input, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
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

  public payPalConfig ?: IPayPalConfig;

  constructor(private productosService:ProductsService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.initConfig();
    if(this.storageService.existCart()) {
      this.productosAPagar = this.storageService.getCart();
      this.productosService.productos = this.storageService.getCart();
    }
  }

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'EUR',
        clientId: 'AR3ScDUb__vFmkXt8vYT2XdwKU2YvWXSwFt-GmmxMbEuMw49fWgX4sCO3zN9JhFBsR0ZJTVLpHlkyMmP',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: '9.99',
                    breakdown: {
                        item_total: {
                            currency_code: 'EUR',
                            value: '9.99'
                        }
                    }
                },
                items: [{
                    name: 'Enterprise Subscription',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'EUR',
                        value: '9.99',
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details: any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });
        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
        },
        onError: err => {
            console.log('OnError', err);
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
        }
    };
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

