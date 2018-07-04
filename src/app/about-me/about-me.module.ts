import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { AppSharedComponentsModule } from '../app-shared-components/app-shared-components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: AboutMeComponent }]),
    TranslateModule.forChild(),
    AppSharedComponentsModule
  ],
  declarations: [AboutMeComponent]
})
export class AboutMeModule {}
