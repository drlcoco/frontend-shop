import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HowWeDoItComponent } from "../how-we-do-it/how-we-do-it.component";
import { TranslateModule } from '@ngx-translate/core';
import { CrystalComponent } from '../crystal/crystal.component';
import { SlidingComponent } from '../sliding/sliding.component';
import { RollerComponent } from '../roller/roller.component';
import { SlatedComponent } from '../slated/slated.component';
import { VenetianComponent } from '../venetian/venetian.component';
import { PleatedComponent } from '../pleated/pleated.component';
import { TextileComponent } from '../textile/textile.component';
import { CustomStructuresComponent } from '../custom-structures/custom-structures.component';
import { PergolasComponent } from '../pergolas/pergolas.component';
import { CoffeeComponent } from '../coffee/coffee.component';
import { RetractableComponent } from '../retractable/retractable.component';
import { FlatComponent } from '../flat/flat.component';
import { OutdoorVerticalComponent } from '../outdoor-vertical/outdoor-vertical.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { IndoorComponent } from '../indoor/indoor.component';
import { OutdoorComponent } from '../outdoor/outdoor.component';
import { AwningSystemComponent } from '../awning-system/awning-system.component';
import { BioclimaticComponent } from '../bioclimatic/bioclimatic.component';
import { TraditionalComponent } from '../traditional/traditional.component';
import { FooterSlimComponent } from '../footer-slim/footer-slim.component';
import { RouterModule } from '@angular/router';
import { ParasolsComponent } from '../parasols/parasols.component';
import { RotatingComponent } from '../rotating/rotating.component';
import { AboutComponent } from '../about/about.component';
import { ClientService } from '../../service/client.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    animations: [
      trigger('animateList', [
        transition(':enter', [
          style({
            transform: 'translateY(-400px)',
            height: 0
          }),
          animate('2000ms ease-out', style({
            transform: 'none',
            height: '*'
          }))
        ])
      ])],
    imports: [
      HowWeDoItComponent,
      IndoorComponent,
      OutdoorComponent,
      CrystalComponent,
      SlidingComponent,
      RollerComponent,
      SlatedComponent,
      VenetianComponent,
      PleatedComponent,
      TextileComponent,
      AwningSystemComponent,
      CustomStructuresComponent,
      PergolasComponent,
      BioclimaticComponent,
      CoffeeComponent,
      RetractableComponent,
      FlatComponent,
      OutdoorVerticalComponent,
      ParasolsComponent,
      RotatingComponent,
      AboutComponent,
      TraditionalComponent,
      FooterSlimComponent,
      TranslateModule,
      RouterModule,
      CommonModule
    ]
})
export class HomeComponent {
  constructor(private translate: TranslateService, private service: ClientService) {
    translate.setDefaultLang(this.service.language);
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
