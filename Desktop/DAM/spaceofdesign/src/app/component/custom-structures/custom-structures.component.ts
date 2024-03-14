import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterSlimComponent } from '../footer-slim/footer-slim.component';

@Component({
  selector: 'app-custom-structures',
  standalone: true,
  imports: [TranslateModule, CommonModule, FooterSlimComponent],
  templateUrl: './custom-structures.component.html',
  styleUrl: './custom-structures.component.css'
})
export class CustomStructuresComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
