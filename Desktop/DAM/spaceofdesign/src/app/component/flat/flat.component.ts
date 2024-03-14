import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterSlimComponent } from '../footer-slim/footer-slim.component';

@Component({
  selector: 'app-flat',
  standalone: true,
  imports: [TranslateModule, CommonModule, FooterSlimComponent],
  templateUrl: './flat.component.html',
  styleUrl: './flat.component.css'
})
export class FlatComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
