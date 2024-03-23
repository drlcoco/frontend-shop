import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterSlimComponent } from '../footer-slim/footer-slim.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-awning-system',
  standalone: true,
  imports: [TranslateModule, CommonModule, RouterModule, FooterSlimComponent],
  templateUrl: './awning-system.component.html',
  styleUrl: './awning-system.component.css'
})
export class AwningSystemComponent {

  img1: string = "/assets/image/diapositiva13/cofre-1.png";
  img2: string = "/assets/image/diapositiva13/toldo-retractil-2.png";
  img3: string = "/assets/image/diapositiva13/toldo-plano.jpg";
  img4: string = "/assets/image/diapositiva13/eros_spire_vertical.jpg";
  img5: string = "/assets/image/diapositiva13/led-5.png";
  img6: string = "/assets/image/diapositiva13/tradicional-6.png";

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
