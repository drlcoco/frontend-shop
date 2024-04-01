import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [TranslateModule, NgClass, FormsModule],
  templateUrl: 'contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  user: any = {
    name: null,
    email: null,
    phone: null,
    message: null,
  };
  successMessage: string | undefined;
  errorMessage: string | undefined;

  constructor(
    private translate: TranslateService,
    private service: ClientService
  ) {
    translate.setDefaultLang(this.service.language);
  }

  switchLanguage(language: string) {
    this.translate.use(this.service.language);
  }

  submitForm() {
    if (
      this.user.name !== null &&
      this.user.email !== null &&
      this.user.phone !== null &&
      this.user.message !== null
    ) {
      this.service.sendEmail(this.user).subscribe(
        response => {
          this.successMessage = 'Email enviado correctamente';
          this.errorMessage = undefined;
          this.user = {};
        },
        error => {
          this.errorMessage = 'Error al enviar el email';
          this.successMessage = undefined;
        }
      );
    } else {
      console.log('Errorrrrr');
    }
  }
}
