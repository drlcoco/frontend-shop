import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-roller',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './roller.component.html',
  styleUrl: './roller.component.css'
})
export class RollerComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
