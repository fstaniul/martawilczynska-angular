import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home.routing';
import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';
import { HomeReviewComponent } from './home-review/home-review.component';
import { ReviewsModule } from '../reviews/reviews.module';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, TranslateModule.forChild(), ReviewsModule.forChild()],
  declarations: [HomeComponent, HomeReviewComponent]
})
export class HomeModule {}
