import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterSlimComponent } from '../footer-slim/footer-slim.component';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'app-led',
  standalone: true,
  imports: [TranslateModule, CommonModule, FooterSlimComponent],
  templateUrl: './led.component.html',
  styleUrl: './led.component.css'
})
export class LedComponent {

  constructor(private translate: TranslateService, private service: ClientService) {
    translate.setDefaultLang(this.service.language);
  }

}
