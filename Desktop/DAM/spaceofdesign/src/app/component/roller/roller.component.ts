import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterSlimComponent } from '../footer-slim/footer-slim.component';

@Component({
  selector: 'app-roller',
  standalone: true,
  imports: [TranslateModule, CommonModule, FooterSlimComponent],
  templateUrl: './roller.component.html',
  styleUrl: './roller.component.css'
})
export class RollerComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
