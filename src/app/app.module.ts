import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialExampleModule } from './material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { PreloadAllModules, Route, RouterModule } from '@angular/router';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
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
import { PaymentComponent } from './payment/payment.component';
import { InputErrorsExample } from './components/login-material/login-material.component';
import { CardhomeComponent } from './components/cardhome/cardhome.component';
import { ModalComponent } from './components/modal/modal.component';
import { MyPurchasesComponent} from './components/my-purchases/my-purchases.component';
import { MyAccountComponent} from './components/my-account/my-account.component';
import { SwalComponent } from './components/swal/swal.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user-guard';
import { RentPointerComponent } from './components/rent-pointer/rent-pointer.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ProductsPanelComponent } from './components/products-panel/products-panel.component';
import { UsersPanelComponent } from './components/users-panel/users-panel.component';
import { JwtInterceptorInterceptor } from './Interceptors/jwt-interceptor.interceptor';
import { AccountDetailsComponent } from './components/account-details/account-details.component';

const APP_ROUTES: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductShowComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'material-login', component: InputErrorsExample },
  { path: 'register', component: RegisterComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'cart', component: CartComponent },
  { path: 'rent', component: ProductRentComponent },
  { path: 'pointer/:id', component: RentPointerComponent },
  { path: 'logout/:sure', component: LoginComponent },
  { path: 'products/update/:id', component: ProductoUpdateComponent, canActivate: [AdminGuard] },
  { path: 'add', component: ProductoAddComponent, canActivate: [AdminGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [UserGuard] },
  { path: 'purchases', component: MyPurchasesComponent, canActivate: [UserGuard] },
  { path: 'account', component: MyAccountComponent, canActivate: [UserGuard] },
  { path: 'account/:id', component: AccountDetailsComponent, canActivate: [AdminGuard] },
  { path: 'panel', component: AdminPanelComponent, canActivate: [AdminGuard] },
  { path:'', component: HomeComponent, pathMatch:'full'},
  { path:'**', component: HomeComponent, pathMatch:'full'},
  { path:'/', component: HomeComponent, pathMatch:'full'}
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
    PaymentComponent,
    InputErrorsExample,
    CardhomeComponent,
    ModalComponent,
    MyPurchasesComponent,
    MyAccountComponent,
    RentPointerComponent,
    AdminPanelComponent,
    ProductsPanelComponent,
    UsersPanelComponent,
    AccountDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(APP_ROUTES, {preloadingStrategy: PreloadAllModules, scrollPositionRestoration:'enabled'}),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialExampleModule,
    MatNativeDateModule,
    SocialLoginModule,
    NgxPayPalModule,
    NgxSpinnerModule,
    ModalModule.forRoot()
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '599542472885-rj6nmvs9ko7l524qhek805t0ec3u0dn8.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
