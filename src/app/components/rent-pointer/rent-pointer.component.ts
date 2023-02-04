import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rent-pointer',
  templateUrl: './rent-pointer.component.html',
  styleUrls: ['./rent-pointer.component.css']
})
export class RentPointerComponent implements OnInit {

  id: number = 0;
  /* rentProduct: */

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"] as number; // Recibimos parámetro
    this.id = id;
    console.log(id);
  }

}
