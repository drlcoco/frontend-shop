import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterSlimComponent } from '../footer-slim/footer-slim.component';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'app-pergolas',
  standalone: true,
  imports: [TranslateModule, CommonModule, FooterSlimComponent],
  templateUrl: './pergolas.component.html',
  styleUrl: './pergolas.component.css'
})
export class PergolasComponent {

  constructor(private translate: TranslateService, private service: ClientService) {
    translate.setDefaultLang(this.service.language);
  }

}
