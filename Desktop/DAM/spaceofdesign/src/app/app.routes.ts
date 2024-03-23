import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { HowWeDoItComponent } from './component/how-we-do-it/how-we-do-it.component';
import { ContactComponent } from './component/contact/contact.component';
import { LanguageComponent } from './component/language/language.component';
import { SlidingComponent } from './component/sliding/sliding.component';
import { RollerComponent } from './component/roller/roller.component';
import { PleatedComponent } from './component/pleated/pleated.component';
import { SlatedComponent } from './component/slated/slated.component';
import { VenetianComponent } from './component/venetian/venetian.component';
import { TextileComponent } from './component/textile/textile.component';
import { AwningSystemComponent } from './component/awning-system/awning-system.component';
import { CustomStructuresComponent } from './component/custom-structures/custom-structures.component';
import { PergolasComponent } from './component/pergolas/pergolas.component';
import { BioclimaticComponent } from './component/bioclimatic/bioclimatic.component';
import { LedComponent } from './component/led/led.component';
import { CoffeeComponent } from './component/coffee/coffee.component';
import { RetractableComponent } from './component/retractable/retractable.component';
import { FlatComponent } from './component/flat/flat.component';
import { OutdoorVerticalComponent } from './component/outdoor-vertical/outdoor-vertical.component';
import { TraditionalComponent } from './component/traditional/traditional.component';
import { IndoorComponent } from './component/indoor/indoor.component';
import { OutdoorComponent } from './component/outdoor/outdoor.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'work', component: HowWeDoItComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'language', component: LanguageComponent },
  { path: 'sliding', component: SlidingComponent },
  { path: 'roller', component: RollerComponent },
  { path: 'pleated', component: PleatedComponent },
  { path: 'slated', component: SlatedComponent },
  { path: 'venetian', component: VenetianComponent },
  { path: 'textile', component: TextileComponent },
  { path: 'awning', component: AwningSystemComponent },
  { path: 'customstructures', component: CustomStructuresComponent },
  { path: 'pergolas', component: PergolasComponent },
  { path: 'bioclimatic', component: BioclimaticComponent },
  { path: 'led', component: LedComponent },
  { path: 'chest', component: CoffeeComponent },
  { path: 'retractil', component: RetractableComponent },
  { path: 'flat', component: FlatComponent },
  { path: 'vertical', component: OutdoorVerticalComponent },
  { path: 'traditional', component: TraditionalComponent },
  { path: 'indoor', component: IndoorComponent },
  { path: 'outdoor', component: OutdoorComponent },
];
