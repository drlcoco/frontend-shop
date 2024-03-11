import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-crystal',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './crystal.component.html',
  styleUrl: './crystal.component.css'
})
export class CrystalComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
