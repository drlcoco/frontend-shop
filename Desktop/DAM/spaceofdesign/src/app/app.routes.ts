import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LanguageComponent } from './component/language/language.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'language', component: LanguageComponent },
  { path: 'work', loadComponent: () => import('./component/how-we-do-it/how-we-do-it.component').then(c => c.HowWeDoItComponent)},
  { path: 'contact', loadComponent: () => import('./component/contact/contact.component').then(c => c.ContactComponent)},
  { path: 'sliding', loadComponent: () => import('./component/sliding/sliding.component').then(c => c.SlidingComponent)},
  { path: 'roller', loadComponent: () => import('./component/roller/roller.component').then(c => c.RollerComponent)},
  { path: 'pleated', loadComponent: () => import('./component/pleated/pleated.component').then(c => c.PleatedComponent)},
  { path: 'slated', loadComponent: () => import('./component/slated/slated.component').then(c => c.SlatedComponent)},
  { path: 'venetian', loadComponent: () => import('./component/venetian/venetian.component').then(c => c.VenetianComponent)},
  { path: 'textile', loadComponent: () => import('./component/textile/textile.component').then(c => c.TextileComponent)},
  { path: 'awning', loadComponent: () => import('./component/awning-system/awning-system.component').then(c => c.AwningSystemComponent)},
  { path: 'customstructures', loadComponent: () => import('./component/custom-structures/custom-structures.component').then(c => c.CustomStructuresComponent)},
  { path: 'pergolas', loadComponent: () => import('./component/pergolas/pergolas.component').then(c => c.PergolasComponent)},
  { path: 'bioclimatic', loadComponent: () => import('./component/bioclimatic/bioclimatic.component').then(c => c.BioclimaticComponent)},
  { path: 'led', loadComponent: () => import('./component/led/led.component').then(c => c.LedComponent)},
  { path: 'chest', loadComponent: () => import('./component/coffee/coffee.component').then(c => c.CoffeeComponent)},
  { path: 'retractil', loadComponent: () => import('./component/retractable/retractable.component').then(c => c.RetractableComponent)},
  { path: 'flat', loadComponent: () => import('./component/flat/flat.component').then(c => c.FlatComponent)},
  { path: 'vertical', loadComponent: () => import('./component/outdoor-vertical/outdoor-vertical.component').then(c => c.OutdoorVerticalComponent)},
  { path: 'traditional', loadComponent: () => import('./component/traditional/traditional.component').then(c => c.TraditionalComponent)},
  { path: 'indoor', loadComponent: () => import('./component/indoor/indoor.component').then(c => c.IndoorComponent)},
  { path: 'outdoor', loadComponent: () => import('./component/outdoor/outdoor.component').then(c => c.OutdoorComponent)},
  { path: 'parasols', loadComponent: () => import('./component/parasols/parasols.component').then(c => c.ParasolsComponent)},
  { path: 'rotating', loadComponent: () => import('./component/rotating/rotating.component').then(c => c.RotatingComponent)},
  { path: 'crystal', loadComponent: () => import('./component/crystal/crystal.component').then(c => c.CrystalComponent)}
];
