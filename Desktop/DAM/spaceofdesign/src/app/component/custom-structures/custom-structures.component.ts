import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-custom-structures',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './custom-structures.component.html',
  styleUrl: './custom-structures.component.css'
})
export class CustomStructuresComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
