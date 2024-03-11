import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-slated',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './slated.component.html',
  styleUrl: './slated.component.css'
})
export class SlatedComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
