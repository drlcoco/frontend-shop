import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../interfaces/i-product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-prodcut-update',
  templateUrl: './prodcut-update.component.html',
  styleUrls: ['./prodcut-update.component.css']
})
export class ProdcutUpdateComponent implements OnInit {

  producto!: IProduct;

  newProducto: IProduct = {
    id: 0,
    title: "",
    description: "",
    stock: 0,
    price: 0,
    image: "",
    userId: 1,
    categoryId: 1
  };

  canDeactivate(){
    return confirm('¿Quieres abandonar la página? Los cambios se perderan');
  }
  @Output() crearEvento: EventEmitter<IProduct> = new EventEmitter();

  constructor(private productosService: ProductsService, private routeId: ActivatedRoute, private router: Router) { }

  updateEvent() {
    console.log(this.producto);
    this.productosService.deleteEvent(this.producto.id as number);
    console.log(this.producto);
    this.producto.price = Number(this.producto.price);
    this.productosService.crearEvento(this.producto).subscribe(
      (_ok)=>{
        alert("Se ha actualizado el evento correctamente");
        this.router.navigate(["products"])},
      (_error)=>alert("Los datos no son válidos!!!")
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

  ngOnInit(): void {
    const id = this.routeId.snapshot.params["id"] as number; // Recibimos parámetro
    this.productosService.getEvento(id)
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


}
