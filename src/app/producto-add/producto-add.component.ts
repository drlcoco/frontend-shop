import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../interfaces/i-product';
import { ProductsService } from '../services/products.service';


import { ComponentDeactivate } from '../guards/save-changes.guard';

@Component({
  selector: 'app-producto-add',
  templateUrl: './producto-add.component.html',
  styleUrls: ['./producto-add.component.css']
})
export class ProductoAddComponent {

  newProducto: IProduct = {
    title:'',
    description: '',
    stock: 0,
    price: 0,
    image: '',
    userId: 1,
    categoryId: 1
  };
  public preview: string | undefined;
  /* @Output() crearEvento: EventEmitter<IEvento> = new EventEmitter(); */

  constructor(private productosService:ProductsService, private route:Router) { }

  addEvento(fileInput: HTMLInputElement) {
    this.productosService.crearEvento(this.newProducto).subscribe(
      (result)=>{
        alert("Se ha añadido el producto correctamente");
        /* this.route.navigate(["products"]) */},
      (error)=>console.log("Los datos no son válidos!!!")
    )
    this.newProducto = {
      title:'',
      description: "",
      stock: 0,
      price: 0,
      image: '',
      userId: 1,
      categoryId: 1
    };
  }

  changeImage(fileInput:HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    console.log(fileInput.files[0]);

    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', (e) => {
      this.newProducto.image = reader.result as string;
      this.preview = reader.result as string;
    });
  }

  canDeactivate() {
    return confirm("¿Quieres abandonar la página?. Los cambios no se guardarán");
  }
}
