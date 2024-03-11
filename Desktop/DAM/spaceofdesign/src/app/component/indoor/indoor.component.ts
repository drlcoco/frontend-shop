import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-indoor',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './indoor.component.html',
  styleUrl: './indoor.component.css'
})
export class IndoorComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
