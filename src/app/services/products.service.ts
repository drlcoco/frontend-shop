import { EventEmitter, Injectable, Output } from '@angular/core';
import { IProduct } from '../interfaces/i-product';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Responses } from '../interfaces/responses';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productos : IProduct[] = [];
  numBadge:number = 0;
  private productoURL = 'http://localhost:8000/api/products';
  headers: HttpHeaders | { [header: string]: string | string[]; } | undefined;

  @Output() disparador:EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getEventos(): Observable<IProduct[]> {
    let options = {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') as string)
    };
    /* return this.http.get<{productos : IProduct[]}>(this.productoURL, options).pipe(
      retry(3),
      map(response => response.productos)
    ); */
    const productoURL = 'http://localhost:8000/api/products';
    return this.http.get<IProduct[]>(productoURL);
  }

  getEvento(id:number): Observable<IProduct> {
    /* let options = {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') as string)
    };
    return this.http.get<{producto : IProduct}>(`${this.productoURL}/${id}`, options).pipe(
      retry(3),
      map(response => response.producto),
      catchError(
        (resp:HttpErrorResponse)=> throwError(`Error obteniendo
        productos. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)
      )
    ); */
    const productoURL = 'http://localhost:8000/api/products';
    return this.http.get<IProduct>(`${this.productoURL}/${id}`);
  }

  crearEvento(producto: IProduct): Observable<IProduct> {
    /* return this.http.post<Responses>(`/evento`, evento).pipe(map(resp => resp.evento)); */
    return this.http.post<Responses>('http://localhost:8000/api/products' , producto).pipe(
			map(resp => {
				return resp.producto;
			}),
      catchError((resp: HttpErrorResponse) =>
        throwError(
          `Error insertando producto: Código de servidor: ${resp.status}. Mensaje: ${resp.message}`
        )
      )
		);
  }

  deleteEvent(id:number){
    return this.http.delete<Responses>(this.productoURL + "/" + id).subscribe(
      (result)=>console.log("Se ha ELIMINADO correctamente el producto: " + id),
      (error)=>console.log("Error al borrar el producto!!! "+ id)
    )
  }

  setNumbadge(num:number){
    this.numBadge = num;
  }

  addProduct(product:IProduct){
    this.productos.push(product);
    console.log(this.productos.length);
    this.numBadge = this.productos.length;
  }

  deleteProduct(id:number){
    for(let i = 0; i < this.productos.length; i++)
    {
        if(id == this.productos[i].id){
          this.productos.splice(i,1);
          console.log(this.productos);
          this.numBadge = this.productos.length;
          break;
        }
    }
    console.log(this.productos.length);
    return this.productos.length;
  }

  printBadge(){
    /* return this.numBadge; */
    return this.productos.length;
  }
}
