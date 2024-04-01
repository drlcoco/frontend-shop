import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [],
  templateUrl: './language.component.html',
  styleUrl: './language.component.css'
})
export class LanguageComponent {

  constructor(private translate: TranslateService, private service: ClientService) {
    translate.setDefaultLang(this.service.language);
  }

  switchLanguage(language: string) {
    this.service.switchLanguage(language);
  }

}
