import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterSlimComponent } from '../footer-slim/footer-slim.component';
import { RouterModule } from '@angular/router';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'app-awning-system',
  standalone: true,
  imports: [TranslateModule, CommonModule, RouterModule, FooterSlimComponent],
  templateUrl: './awning-system.component.html',
  styleUrl: './awning-system.component.css'
})
export class AwningSystemComponent {

  img1: string = "./assets/image/cofre-1.png";
  img2: string = "./assets/image/toldo-retractil-2.png";
  img3: string = "./assets/image/toldo-plano.jpg";
  img4: string = "./assets/image/erosspirevertical.jpg";
  img5: string = "./assets/image/parasol1.png";
  img6: string = "./assets/image/tradicional-6.png";

  constructor(private translate: TranslateService, private service: ClientService) {
    translate.setDefaultLang(this.service.language);
  }

}
