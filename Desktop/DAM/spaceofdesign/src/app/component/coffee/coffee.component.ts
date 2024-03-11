import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-coffee',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './coffee.component.html',
  styleUrl: './coffee.component.css'
})
export class CoffeeComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
