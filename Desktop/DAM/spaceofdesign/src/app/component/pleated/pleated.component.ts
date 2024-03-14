import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterSlimComponent } from '../footer-slim/footer-slim.component';

@Component({
  selector: 'app-pleated',
  standalone: true,
  imports: [TranslateModule, CommonModule, FooterSlimComponent],
  templateUrl: './pleated.component.html',
  styleUrl: './pleated.component.css'
})
export class PleatedComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
