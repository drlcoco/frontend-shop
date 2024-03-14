import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterSlimComponent } from '../footer-slim/footer-slim.component';

@Component({
  selector: 'app-how-we-do-it',
  standalone: true,
  imports: [TranslateModule, CommonModule, FooterSlimComponent],
  templateUrl: './how-we-do-it.component.html',
  styleUrl: './how-we-do-it.component.css'
})
export class HowWeDoItComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
