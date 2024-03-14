import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterSlimComponent } from '../footer-slim/footer-slim.component';

@Component({
  selector: 'app-slated',
  standalone: true,
  imports: [TranslateModule, CommonModule, FooterSlimComponent],
  templateUrl: './slated.component.html',
  styleUrl: './slated.component.css'
})
export class SlatedComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
