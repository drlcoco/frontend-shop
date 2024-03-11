import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './component/nav/nav.component';
import { FooterComponent } from './component/footer/footer.component';
import { TranslateService } from '@ngx-translate/core';
import { ContactComponent } from './component/contact/contact.component';
import { LanguageComponent } from './component/language/language.component';
import { HowWeDoItComponent } from './component/how-we-do-it/how-we-do-it.component';
import { CrystalComponent } from './component/crystal/crystal.component';
import { RollerComponent } from './component/roller/roller.component';
import { SlatedComponent } from './component/slated/slated.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      CommonModule,
      RouterOutlet,
      FooterComponent,
      NavComponent,
      ContactComponent,
      LanguageComponent,
      HowWeDoItComponent,
      CrystalComponent,
      RollerComponent,
      SlatedComponent
    ]
})
export class AppComponent {
  title = 'spaceofdesign';
}

