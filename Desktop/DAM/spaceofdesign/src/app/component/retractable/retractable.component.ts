import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-retractable',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './retractable.component.html',
  styleUrl: './retractable.component.css'
})
export class RetractableComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
