import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterSlimComponent } from '../footer-slim/footer-slim.component';

@Component({
  selector: 'app-retractable',
  standalone: true,
  imports: [TranslateModule, CommonModule, FooterSlimComponent],
  templateUrl: './retractable.component.html',
  styleUrl: './retractable.component.css'
})
export class RetractableComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
