import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../interfaces/i-product';

@Component({
  selector: 'app-canvas-cart',
  templateUrl: './canvas-cart.component.html',
  styleUrls: ['./canvas-cart.component.css']
})
export class CanvasCartComponent implements OnInit {

  @Input() addedProducts:IProduct[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
