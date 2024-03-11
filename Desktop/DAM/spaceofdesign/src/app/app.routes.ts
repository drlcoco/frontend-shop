import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { HowWeDoItComponent } from './component/how-we-do-it/how-we-do-it.component';
import { ContactComponent } from './component/contact/contact.component';
import { LanguageComponent } from './component/language/language.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'work', component: HowWeDoItComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'language', component: LanguageComponent },
];
