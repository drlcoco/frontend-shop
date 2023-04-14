import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { IProduct } from '../interfaces/i-product';
import { ProductsService } from '../services/products.service';
import { StorageService } from '../services/storage.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../components/modal/modal.component';
import { IUser } from '../interfaces/i-user';
import { UserService } from '../services/user.service';
import { Email } from '../interfaces/email';

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
  email: Email = {
    user: this.auth,
    products: this.productosAPagar,
    total: this.calcularTotal()
  }
  theme: boolean = false;

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
      product.stock = product.stock - 1;
      this.productosService.updateEvento(product).subscribe(
        ok => 'Producto actualizado correctamente',
        err => 'Error actualizando producto'
      );
      if(this.auth.id !== undefined){
        product.userId = this.auth.id;
      }
      this.productosService.addPurchase(product).subscribe(
        ok => 'Compra añadida a la base de datos correctamente',
        err => 'Error añadiendo la compra a la base de datos'
      );
    });
    this.email.user = this.auth;
    this.email.products = this.productosAPagar;
    this.email.total = this.calcularTotal();
    this.productosService.sendEmail(this.email).subscribe(
      ok => 'Email enviado correctamente',
      err => 'Error enviando email'
    );
    this.modalService.show(ModalComponent);
  }

  updateTableTheme(): boolean {
    this.theme = this.storageService.getDarkTheme();
    return this.theme;
  }

}

