import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/interfaces/i-product';
import { ProductsService } from 'src/app/services/products.service';
import { StorageService } from 'src/app/services/storage.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products-panel',
  templateUrl: './products-panel.component.html',
  styleUrls: ['./products-panel.component.css']
})
export class ProductsPanelComponent implements OnInit {

  productos: IProduct[] = [];
  theme: boolean = false;

  constructor(private storageService: StorageService,
              private productsService : ProductsService,
              private router: Router,) { }

  ngOnInit(): void {
    this.productsService.getEventos().subscribe(
      resp =>{
        this.productos = resp;
      },
      error =>{console.log(error);
      }
    );
  }

  deleteItem(producto: IProduct) {
    console.log('Borrando producto '+ producto.id);
    this.productsService.deleteEvent(producto.id as number);
    this.productsService.getEventos().subscribe(
      (ok) => console.log('obteniendo productos'),
      (error) => console.log('Error obteniendo productos en el panel')
    );
    this.router.navigate(['/panel']);
  }

  editItem(producto: IProduct) {
    console.log('Editando producto '+ producto.id);
  }

  updateTableTheme(): boolean {
    this.theme = this.storageService.getDarkTheme();
    return this.theme;
  }

}
