import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterSlimComponent } from '../footer-slim/footer-slim.component';

@Component({
  selector: 'app-traditional',
  standalone: true,
  imports: [TranslateModule, CommonModule, FooterSlimComponent],
  templateUrl: './traditional.component.html',
  styleUrl: './traditional.component.css'
})
export class TraditionalComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
