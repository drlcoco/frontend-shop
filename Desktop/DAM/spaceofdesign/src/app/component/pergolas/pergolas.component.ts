import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-pergolas',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './pergolas.component.html',
  styleUrl: './pergolas.component.css'
})
export class PergolasComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
