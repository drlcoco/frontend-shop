import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-led',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './led.component.html',
  styleUrl: './led.component.css'
})
export class LedComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
