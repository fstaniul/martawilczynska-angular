import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReactiveFormsModule } from '@angular/forms';

import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { LanguageRouterComponent } from './components/language-router/language-router.component';
import { SurgicalProceduresComponent } from './components/surgical-procedures/surgical-procedures.component';
import { ContactComponent } from './components/contact/contact.component';
import { DriveComponent } from './components/drive/drive.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LogoComponent } from './components/logo/logo.component';
import { OfficeAndStaffComponent } from './components/office-and-staff/office-and-staff.component';
import { HomeComponent } from './components/home/home.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { TitleService } from './services/title.service';
import { DataService } from './services/data.service';
import { AlertComponent } from './components/alert/alert.component';
import { PageLoaderComponent } from './components/page-loader/page-loader.component';
import { AnimatedLoaderComponent } from './components/page-loader/animated-loader/animated-loader.component';
import { ContactFormComponent } from './components/contact/contact-form/contact-form.component';
import { NotEmptyDirective } from './directives/forms/not-empty.directive';
import { InputErrorMessagesComponent } from './components/forms/input-error-messages/input-error-messages.component';
import { ContactIntoComponent } from './components/contact/contact-into/contact-into.component';
import { PhotoGaleryComponent } from './components/galeries/photo-galery/photo-galery.component';
import { DriveInfoComponent } from './components/drive/drive-info/drive-info.component';
import { CacheService } from './services/cache.service';
import { QuoteComponent } from './components/utils/quote/quote.component';
import { BetterCarouselComponent } from './components/galeries/better-carousel/better-carousel.component';
import { ReviewsModule } from './reviews/reviews.module';
import { LanguageSwitcherComponent } from './components/utils/language-switcher/language-switcher.component';
import { InitialRedirectComponent } from './components/initial-redirect/initial-redirect.component';
import { NetflixstyleCarouselGaleryComponent } from './components/galeries/netflixstyle-carousel-galery/netflixstyle-carousel-galery.component';
import { CustomFormsModule } from './custom-forms/custom-forms.module';

export function translateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LanguageRouterComponent,
    SurgicalProceduresComponent,
    ContactComponent,
    DriveComponent,
    NavigationComponent,
    LogoComponent,
    OfficeAndStaffComponent,
    HomeComponent,
    AboutMeComponent,
    AlertComponent,
    PageLoaderComponent,
    AnimatedLoaderComponent,
    ContactFormComponent,
    NotEmptyDirective,
    InputErrorMessagesComponent,
    ContactIntoComponent,
    PhotoGaleryComponent,
    DriveInfoComponent,
    QuoteComponent,
    BetterCarouselComponent,
    LanguageSwitcherComponent,
    InitialRedirectComponent,
    NetflixstyleCarouselGaleryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReviewsModule,
    CustomFormsModule
  ],
  providers: [TitleService, DataService, CacheService],
  bootstrap: [AppComponent]
})
export class AppModule {}
