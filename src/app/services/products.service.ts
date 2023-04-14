import { EventEmitter, Injectable, Output } from '@angular/core';
import { IProduct } from '../interfaces/i-product';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Responses } from '../interfaces/responses';
import { StorageService } from './storage.service';
import Swal from 'sweetalert2';
import { IPurchase } from '../interfaces/i-purchase';
import { IUser } from '../interfaces/i-user';
import { Email } from '../interfaces/email';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productos : IProduct[] = [];
  numBadge:number = 0;
  badgeNumber: number = 0;
  url:string = "https://apirest.patinetesdriveelectric.com/public/api/products";
  private productoURL = "https://apirest.patinetesdriveelectric.com/public/api/products";
  headers: HttpHeaders | { [header: string]: string | string[]; } | undefined;

  constructor(private http: HttpClient) { }

  getHomeProducts(): Observable<IProduct[]> {
    let options = {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') as string)
    };
    const productoURL = "https://apirest.patinetesdriveelectric.com/public/api/products";
    return this.http.get<IProduct[]>(productoURL).pipe(
      map(response => response = this.productos.filter(resp => resp.price > 0))
    );
  }

  getEventos(): Observable<IProduct[]> {
    const productoURL = "https://apirest.patinetesdriveelectric.com/public/api/products";
    return this.http.get<IProduct[]>(productoURL).pipe(
      map(response => response),
      catchError(
        (resp:HttpErrorResponse)=> throwError(`Error obteniendo
        productos. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)
      )
    );
  }

  getEvento(id:number) {
    return this.http.get<IProduct>(`${this.productoURL}/${id}`);
  }

  crearEvento(producto: IProduct): Observable<IProduct> {
    const productoURL = "https://apirest.patinetesdriveelectric.com/public/api/products";
    return this.http.post<Responses>("https://apirest.patinetesdriveelectric.com/public/api/products" , producto).pipe(
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

  updateEvento(producto: IProduct): Observable<IProduct> {
    const productoURL = "https://apirest.patinetesdriveelectric.com/public/api/products";
    return this.http.put<Responses>(`${productoURL}/${producto.id}` , producto).pipe(
			map(resp => {
        console.log('Actualizando stock del producto comprado. '+resp);
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
    const productoURL = "https://apirest.patinetesdriveelectric.com/public/api/products";
    return this.http.delete<Responses>(productoURL + "/" + id).subscribe(
      (result)=> {
        Swal.fire({
          title: 'Producto Eliminado',
          icon: 'success',
          text: 'Se ha eliminado el producto con éxito!.',
          timer: 4000
        })
      },
      (error)=> {
        Swal.fire({
          title: 'Error Eliminando el producto!',
          icon: 'error',
          text: 'No se ha eliminado el producto con éxito!.',
          timer: 4000
        })
      }
    )
  }

  addProduct(product:IProduct){
    this.productos.push(product);
  }

  deleteProduct(id:number){
    for(let i = 0; i < this.productos.length; i++)
    {
        if(id == this.productos[i].id){
          this.productos.splice(i,1);
          this.numBadge = this.productos.length;
          break;
        }
    }
    return this.productos.length;
  }

  sendEmail(email: Email): Observable<Responses> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = 'https://apirest.patinetesdriveelectric.com/public/api/sendEmail';
    /* const json = JSON.stringify(email); */
    /* const data = new FormData();
    data.append('emailData', email.user); */

    /* return this.http.post<Responses>(url, {headers: headers}).pipe( */
    return this.http.post<Responses>(url, email).pipe(
      map(resp => {
        console.log('Se ha enviado el email correctamente');
        console.log(resp);
				return resp;
			}),
      catchError((resp: HttpErrorResponse) =>
        throwError(
          `Error insertando la compra: Código de servidor: ${resp.status}. Mensaje: ${resp.message}`
        )
      )
    );
  }

  addPurchase(product:IProduct): Observable<Responses> {
    return this.http.post<Responses>('https://apirest.patinetesdriveelectric.com/public/api/purchases' , product).pipe(
			map(resp => {
        console.log('Se ha añadido la compra a la base de datos en addPurchase');
        console.log(product);
				return resp;
			}),
      catchError((resp: HttpErrorResponse) =>
        throwError(
          `Error insertando la compra: Código de servidor: ${resp.status}. Mensaje: ${resp.message}`
        )
      )
		);
  }

  getUserPurchase(id: number | undefined){
    if(id){
      return this.http.get<IProduct>(`https://apirest.patinetesdriveelectric.com/public/api/purchases/${id}`);
    }
    else{
      return "La id"+ id +"ha fallado";
    }
  }

  getPurchases(): Observable<IProduct[]> {
    const productoURL = 'https://apirest.patinetesdriveelectric.com/public/api/purchases';
    return this.http.get<IProduct[]>(productoURL).pipe(
      map(response => {
        return response;
      }),
      catchError(
        (resp:HttpErrorResponse)=> throwError(`Error obteniendo
        las compras. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)
      )
    );
  }

}
