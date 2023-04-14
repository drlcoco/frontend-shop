import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IProduct } from 'src/app/interfaces/i-product';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit, OnDestroy {

  modalRef?: BsModalRef;
  productosAPagar:IProduct[] = [];

  constructor(private modalService: BsModalService,
    private bsModalRef: BsModalRef,
    private storageService: StorageService,
    private userService: UserService,
    private router: Router) {}

  ngOnInit(): void {
    if(this.storageService.existCart()) {
      this.productosAPagar = this.storageService.getCart();
    }
  }

  ngOnDestroy() {
    this.router.navigate(["/products"]);
  }

}


