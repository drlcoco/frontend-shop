import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule} from '@angular/material/badge';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { LoginComponent } from './login/login.component';
import { PreloadAllModules, Route, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { ProductRentComponent } from './product-rent/product-rent.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { CanvasCartComponent } from './canvas-cart/canvas-cart.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductoAddComponent } from './producto-add/producto-add.component';
import { ProductoUpdateComponent } from './producto-update/producto-update.component';
import { ProductShowComponent } from './product-show/product-show.component';
import { EventFilterPipe } from './pipes/event-filter.pipe';
import { ProdcutUpdateComponent } from './prodcut-update/prodcut-update.component';
import { PaymentComponent } from './payment/payment.component';

const APP_ROUTES: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductShowComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'cart', component: CartComponent },
  { path: 'rent', component: ProductRentComponent },
  { path: 'products/update/:id', component: ProductoUpdateComponent },
  { path: 'add', component: ProductoAddComponent },
  { path: 'payment', component: PaymentComponent },
  { path:'/', redirectTo:'/home', pathMatch:'full'},
  { path:'**', redirectTo:'/home', pathMatch:'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ContactComponent,
    CartComponent,
    ProductRentComponent,
    NavComponent,
    FooterComponent,
    CanvasCartComponent,
    ProductItemComponent,
    ProductDetailsComponent,
    ProductoAddComponent,
    ProductoUpdateComponent,
    ProductShowComponent,
    EventFilterPipe,
    ProdcutUpdateComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(APP_ROUTES, {preloadingStrategy: PreloadAllModules}),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
