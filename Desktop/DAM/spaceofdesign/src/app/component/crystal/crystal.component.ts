import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterSlimComponent } from '../footer-slim/footer-slim.component';

@Component({
  selector: 'app-crystal',
  standalone: true,
  imports: [TranslateModule, CommonModule, FooterSlimComponent],
  templateUrl: './crystal.component.html',
  styleUrl: './crystal.component.css'
})
export class CrystalComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
