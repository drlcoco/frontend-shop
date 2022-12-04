import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IProduct } from '../interfaces/i-product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-producto-update',
  templateUrl: './producto-update.component.html',
  styleUrls: ['./producto-update.component.css']
})
export class ProductoUpdateComponent implements OnInit {

  producto!: IProduct;
  id:number = 0;
  newProducto: IProduct = {
    id:0,
    title:'',
    description: "",
    stock: 0,
    price: 0,
    image: '',
    userId: 1,
    categoryId: 1
  };

  ngOnInit(): void {
    this.id = this.routeId.snapshot.params["id"] as number; // Recibimos parámetro
    this.productosService.getEvento(this.id)
      .subscribe(
        async (p) => {
          this.producto = p;
          console.log(this.producto);
          this.producto.price=Number(this.producto.price);

          const reader: FileReader = new FileReader();
          let imagen= await fetch(this.producto.image).then(r=>r.blob());
          reader.readAsDataURL(imagen);
          reader.addEventListener('loadend', e =>{
            this.producto.image =reader.result as string;
            console.log(this.producto.image);
          })
        },
          error => console.error(error)
      );
    this.producto.price=Number(this.producto.price);
  }

  canDeactivate(){
    return confirm('¿Quieres abandonar la página? Los cambios se perderan');
  }
  @Output() crearEvento: EventEmitter<IProduct> = new EventEmitter();

  constructor(private productosService: ProductsService, private routeId: ActivatedRoute, private router: Router) { }

  updateProduct() {
    this.producto.id = this.id;
    this.producto.price = Number(this.producto.price);
    this.productosService.updateEvento(this.producto).subscribe(
      (_ok)=>{
        Swal.fire({
          title: 'Producto Actualizado',
          icon: 'success',
          text: 'Se ha actualizado el producto con éxito!.',
          timer: 4000
        })
        this.router.navigate([`products/${this.id}`])},
      (_error)=> {
        Swal.fire({
          title: 'Error actualizando el producto',
          icon: 'error',
          text: 'No se ha actualizado el producto correctamente.',
          timer: 4000
        })
      }
    );
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', (e) => {
      this.producto.image = reader.result as string;
    });
  }

}
