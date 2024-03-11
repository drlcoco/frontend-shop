import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { PreloadAllModules, RouterModule, provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return  new  TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

export const provideTranslation = () => ({
  defaultLanguage: 'es',
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(), // required animations providers
    provideHttpClient(),
    importProvidersFrom([
      RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, scrollPositionRestoration:'enabled'}),
      HttpClientModule,
      TranslateModule.forRoot(provideTranslation())
    ]),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules)
    )
    /* provideRouter(routes), */

  ]
};
