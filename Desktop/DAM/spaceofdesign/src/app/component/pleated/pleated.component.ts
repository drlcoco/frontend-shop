import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-pleated',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './pleated.component.html',
  styleUrl: './pleated.component.css'
})
export class PleatedComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
