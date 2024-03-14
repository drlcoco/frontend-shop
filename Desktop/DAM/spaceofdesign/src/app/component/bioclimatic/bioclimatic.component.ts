import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterSlimComponent } from '../footer-slim/footer-slim.component';

@Component({
  selector: 'app-bioclimatic',
  standalone: true,
  imports: [TranslateModule, CommonModule, FooterSlimComponent],
  templateUrl: './bioclimatic.component.html',
  styleUrl: './bioclimatic.component.css'
})
export class BioclimaticComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
