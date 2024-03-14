import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterSlimComponent } from '../footer-slim/footer-slim.component';

@Component({
  selector: 'app-coffee',
  standalone: true,
  imports: [TranslateModule, CommonModule, FooterSlimComponent],
  templateUrl: './coffee.component.html',
  styleUrl: './coffee.component.css'
})
export class CoffeeComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
