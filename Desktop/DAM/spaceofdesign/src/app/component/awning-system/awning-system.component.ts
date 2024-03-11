import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-awning-system',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './awning-system.component.html',
  styleUrl: './awning-system.component.css'
})
export class AwningSystemComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
