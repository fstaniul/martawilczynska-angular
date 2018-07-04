import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './components/logo/logo.component';
import { QuoteComponent } from './components/quote/quote.component';
import { NetflixstyleCarouselGaleryComponent } from './components/galeries/netflixstyle-carousel-galery/netflixstyle-carousel-galery.component';
import { PhotoGaleryComponent } from './components/galeries/photo-galery/photo-galery.component';
import { ContactIntoComponent } from './components/contact/contact-into/contact-into.component';
import { DriveInfoComponent } from './components/drive/drive-info/drive-info.component';
import { InputErrorMessagesComponent } from './components/forms/input-error-messages/input-error-messages.component';
import { NotEmptyDirective } from './components/forms/not-empty.directive';
import { PageLoaderComponent } from './components/page-loader/page-loader.component';
import { AnimatedLoaderComponent } from './components/page-loader/animated-loader/animated-loader.component';
import { AlertComponent } from './components/alert/alert.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, TranslateModule.forChild()],
  declarations: [
    LogoComponent,
    QuoteComponent,
    NetflixstyleCarouselGaleryComponent,
    PhotoGaleryComponent,
    ContactIntoComponent,
    DriveInfoComponent,
    InputErrorMessagesComponent,
    NotEmptyDirective,
    PageLoaderComponent,
    AnimatedLoaderComponent,
    AlertComponent
  ],
  exports: [
    LogoComponent,
    QuoteComponent,
    NetflixstyleCarouselGaleryComponent,
    PhotoGaleryComponent,
    ContactIntoComponent,
    DriveInfoComponent,
    InputErrorMessagesComponent,
    NotEmptyDirective,
    PageLoaderComponent,
    AnimatedLoaderComponent,
    AlertComponent
  ]
})
export class AppSharedComponentsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppSharedComponentsModule,
      providers: []
    };
  }
}
