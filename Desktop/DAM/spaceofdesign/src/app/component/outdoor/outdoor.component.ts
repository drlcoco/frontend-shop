import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-outdoor',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './outdoor.component.html',
  styleUrl: './outdoor.component.css'
})
export class OutdoorComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
