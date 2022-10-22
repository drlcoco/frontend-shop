import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'driveElectric';
  usuarios = [];
  badgeNum = 0;

  /* constructor(private authService: AuthService){} */
  constructor(private productosService:ProductsService) { }
  ngOnInit(): void {
    this.badgeNum = this.productosService.printBadge();
    /* localStorage.clear(); */
  }

  /* ngOnInit(): void {
    this.authService.getUser().subscribe(next(data: Array) => {
      this.usuarios = data;
    });
  } */
}

