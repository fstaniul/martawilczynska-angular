import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { LanguageRouterComponent } from './components/language-router/language-router.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { TitleService } from './services/title.service';
import { DataService } from './services/data.service';
import { CacheService } from './services/cache.service';
import { ReviewsModule } from './reviews/reviews.module';
import { LanguageSwitcherComponent } from './components/utils/language-switcher/language-switcher.component';
import { InitialRedirectComponent } from './components/initial-redirect/initial-redirect.component';
import { CustomFormsModule } from './custom-forms/custom-forms.module';
import { AppSharedComponentsModule } from './app-shared-components/app-shared-components.module';

export function translateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LanguageRouterComponent,
    NavigationComponent,
    HomeComponent,
    LanguageSwitcherComponent,
    InitialRedirectComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReviewsModule.forRoot(),
    AppSharedComponentsModule.forRoot(),
    CustomFormsModule
  ],
  providers: [TitleService, DataService, CacheService],
  bootstrap: [AppComponent]
})
export class AppModule {}
