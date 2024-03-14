import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterSlimComponent } from '../footer-slim/footer-slim.component';

@Component({
  selector: 'app-sliding',
  standalone: true,
  imports: [TranslateModule, CommonModule, FooterSlimComponent],
  templateUrl: './sliding.component.html',
  styleUrl: './sliding.component.css'
})
export class SlidingComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
