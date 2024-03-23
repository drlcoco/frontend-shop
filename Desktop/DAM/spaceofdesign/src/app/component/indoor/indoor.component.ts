import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterSlimComponent } from '../footer-slim/footer-slim.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-indoor',
  standalone: true,
  imports: [TranslateModule, CommonModule, RouterModule, FooterSlimComponent],
  templateUrl: './indoor.component.html',
  styleUrl: './indoor.component.css'
})
export class IndoorComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
