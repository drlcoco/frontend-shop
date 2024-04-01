import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterSlimComponent } from '../footer-slim/footer-slim.component';
import { RouterModule } from '@angular/router';
import { AwningSystemComponent } from '../awning-system/awning-system.component';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'app-outdoor',
  standalone: true,
  imports: [TranslateModule, CommonModule, RouterModule, FooterSlimComponent, AwningSystemComponent],
  templateUrl: './outdoor.component.html',
  styleUrl: './outdoor.component.css'
})
export class OutdoorComponent {

  img1: string = "./assets/image/1.jpg";
  img2: string = "./assets/image/2.png";
  img3: string = "./assets/image/3.png";
  img4: string = "./assets/image/4.png";
  img5: string = "./assets/image/parasol.jpg";
  img6: string = "./assets/image/italia1.png";

  constructor(private translate: TranslateService, private service: ClientService) {
    translate.setDefaultLang(this.service.language);
  }

}
