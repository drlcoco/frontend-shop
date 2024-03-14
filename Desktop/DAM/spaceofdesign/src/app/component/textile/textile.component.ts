import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterSlimComponent } from '../footer-slim/footer-slim.component';

@Component({
  selector: 'app-textile',
  standalone: true,
  imports: [TranslateModule, CommonModule, FooterSlimComponent],
  templateUrl: './textile.component.html',
  styleUrl: './textile.component.css'
})
export class TextileComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
