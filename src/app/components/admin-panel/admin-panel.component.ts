import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/i-product';
import { ProductsService } from 'src/app/services/products.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  productos: IProduct[] = [];
  theme: boolean = false;

  constructor(private storageService: StorageService,
    private productosService : ProductsService) { }

  ngOnInit(): void {
    this.productosService.getEventos().subscribe(
      resp =>{
        this.productos = resp;
      },
      error =>{console.log(error);
      }
    );
  }

  deleteItem(producto: IProduct) {
    console.log('Borrando producto '+ producto.id);
  }

  editItem(producto: IProduct) {
    console.log('Editando producto '+ producto.id);
  }

  updateTableTheme(): boolean {
    this.theme = this.storageService.getDarkTheme();
    return this.theme;
  }

}
