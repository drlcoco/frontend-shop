import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sliding',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './sliding.component.html',
  styleUrl: './sliding.component.css'
})
export class SlidingComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
