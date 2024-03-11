import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-traditional',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './traditional.component.html',
  styleUrl: './traditional.component.css'
})
export class TraditionalComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
