import { Component, Input, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IProduct } from 'src/app/interfaces/i-product';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent {

  modalRef?: BsModalRef;
  productosAPagar:IProduct[] = [];

  constructor(private modalService: BsModalService,
    private bsModalRef: BsModalRef,
    private storageService: StorageService) {}

  ngOnInit(): void {
    if(this.storageService.existCart()) {
      this.productosAPagar = this.storageService.getCart();
    }
  }

}


