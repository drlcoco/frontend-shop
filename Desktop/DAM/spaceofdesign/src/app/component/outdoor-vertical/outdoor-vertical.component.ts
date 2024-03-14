import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterSlimComponent } from '../footer-slim/footer-slim.component';

@Component({
  selector: 'app-outdoor-vertical',
  standalone: true,
  imports: [TranslateModule, CommonModule, FooterSlimComponent],
  templateUrl: './outdoor-vertical.component.html',
  styleUrl: './outdoor-vertical.component.css'
})
export class OutdoorVerticalComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
