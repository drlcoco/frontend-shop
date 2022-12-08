import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { IProduct } from '../interfaces/i-product';
import { ProductsService } from '../services/products.service';
import { StorageService } from '../services/storage.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../components/modal/modal.component';
import { IUser } from '../interfaces/i-user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @Input() producto: IProduct = {
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
  auth: IUser = {
    id:0,
    name:'',
    surname:'',
    phone:0,
    address:'',
    role:'',
    email:'',
    password:'',
    image:''
  }

  public payPalConfig ?: IPayPalConfig;

  constructor(private productosService:ProductsService,
    private userService: UserService,
    private storageService: StorageService,
    private modalService: BsModalService,
    private modalRef: BsModalRef,
    /* private modalComponent: ModalComponent */) { }

  ngOnInit(): void {
    this.initConfig();
    if(this.storageService.existCart()) {
      this.productosAPagar = this.storageService.getCart();
      console.log(this.productosAPagar);

      this.productosService.productos = this.storageService.getCart();
    }
    if(this.userService.existAuth()){
      this.auth = this.userService.getAuth();
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
                    value: this.calcularTotal().toString(),
                    breakdown: {
                        item_total: {
                            currency_code: 'EUR',
                            value: this.calcularTotal().toString()
                        }
                    }
                },
                items: this.getPaypalProducts()
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
            this.openModal();
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

  calcularTotal(){
    this.precioTotal = 0;
    for(let i = 0; i < this.productosAPagar.length; i++)
    {
      this.precioTotal += this.productosAPagar[i].price;
    }
    return this.precioTotal;
  }

  getPaypalProducts(){
    const items: any[] = [];
    let item = {};
    this.productosAPagar.forEach((product: IProduct) => {
      item = {
        name: product.title,
        quantity: 1,
        unit_amount: {value: product.price, currency_code: 'EUR'}
      };
      items.push(item);
    });
    return items;
  }

  openModal() {
    console.log("Abriendo el modal");
    this.productosAPagar.forEach((product: IProduct) => {
      this.producto.title = product.title;
      this.producto.description = product.description;
      this.producto.stock = product.stock - 1;
      this.producto.price = product.price;
      this.producto.image = product.image;
      this.producto.userId = product.userId;
      this.producto.categoryId = product.categoryId;
      console.log(product);
      console.log(this.producto);
      this.productosService.updateEvento(this.producto);
      if(this.auth.id !== undefined){
        this.producto.userId = this.auth.id;
      }
      this.productosService.addPurchase(this.producto);
    });
    this.modalService.show(ModalComponent);
  }

}

