import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";

@Component({
  selector: 'app-swal',
  templateUrl: './swal.component.html',
  styleUrls: ['./swal.component.css']
})
export class SwalComponent implements OnInit {
  async: any;

  constructor() { }

  ngOnInit(): void {
    this.swalError();
  }

  swalError(){
    Swal.fire({
      title: 'No queda Stock!',
      text: 'Lo sentimos, en este momento el producto no está disponible',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })
  }

}
