import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from './auth.service';
import { IUser } from './interfaces/i-user';
import { CartServiceService } from './services/cart-service.service';
import { ProductsService } from './services/products.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  theme: Theme = 'light-theme';
  title = 'driveElectric';
  usuarios = [];
  badgeNum = 0;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private cartService: CartServiceService,
    private productosService:ProductsService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.initializeTheme();
  }

  switchTheme() {
    this.document.body.classList.replace(
      this.theme, this.theme === 'light-theme' ? (this.theme = 'dark-theme') : (this.theme = 'light-theme')
    );
  }

  initializeTheme = (): void =>
    this.renderer.addClass(this.document.body, this.theme);
}

export type Theme = 'dark-theme' | 'light-theme';


