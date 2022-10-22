import { Component, OnInit } from '@angular/core';
import { IProduct } from '../interfaces/i-product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.css']
})
export class ProductShowComponent implements OnInit {

  productos: IProduct[] = [];

  filterSearch: string = '';
  ProductsService: any;

  //Evento vacío para comprobar el if else. Si está vacío muestra -No hay eventos disponibles-
  //eventos:IEvento[] = [];

  constructor(private productosService : ProductsService) {}


  ordenarStock(enlaceEvento: Event) {
    enlaceEvento.preventDefault();
    this.filterSearch = "";
    this.productos.sort((a,b)=>{
      return a.stock - b.stock;
    })
  }
  ordenarPrecio(enlaceEvento: Event) {
    enlaceEvento.preventDefault();
    this.filterSearch = "";
    this.productos.sort((a,b)=>{
      return a.price - b.price;
    })
  }
  /* deleteEvent(evento: IEvento){
    this.eventos = this.eventos.filter((e)=> evento.title.toLocaleLowerCase()!=e.title.toLocaleLowerCase());
  } */
  /* crearEvento(evento:IEvento){
    this.eventos.push(evento);
  } */

  ngOnInit(): void {
    /* this.EventosServiceService.getEventos().subscribe(
      (      event: IEvento[]) => this.eventos = event,
      (      error: any) => console.error(error),
      () => console.log('Events loaded')
    ); */

    this.productosService.getEventos().subscribe(
      resp =>{
        console.log(resp);
        this.productos = resp;
        console.log(this.productos);
      }
    )
  }

}
