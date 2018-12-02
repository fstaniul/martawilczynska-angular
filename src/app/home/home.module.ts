import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home.routing';
import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';
import { HomeReviewComponent } from './home-review/home-review.component';
import { ReviewsDisplayComponent } from './reviews-display/reviews-display.component';
import { HomeHeadingComponent } from './home-heading/home-heading.component';
import { AppSharedComponentsModule } from '../app-shared-components/app-shared-components.module';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, TranslateModule.forChild(), AppSharedComponentsModule],
  declarations: [HomeComponent, HomeReviewComponent, ReviewsDisplayComponent, HomeHeadingComponent]
})
export class HomeModule {}
