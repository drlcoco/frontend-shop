import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-bioclimatic',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './bioclimatic.component.html',
  styleUrl: './bioclimatic.component.css'
})
export class BioclimaticComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
