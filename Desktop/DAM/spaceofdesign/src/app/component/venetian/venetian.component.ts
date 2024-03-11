import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-venetian',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './venetian.component.html',
  styleUrl: './venetian.component.css'
})
export class VenetianComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

}
