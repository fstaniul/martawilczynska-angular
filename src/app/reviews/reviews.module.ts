import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review/review.component';
import { ReviewsComponent } from './reviews.component';
import { ReviewAddComponent } from './review-add/review-add.component';
import { ReviewViewComponent } from './review-view/review-view.component';
import { ReviewService } from './services/review.service';
import { ReviewsDisplayComponent } from './reviews-display/reviews-display.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ReviewComponent, ReviewsComponent, ReviewAddComponent, ReviewViewComponent, ReviewsDisplayComponent],
  providers: [ReviewService]
})
export class ReviewsModule {}
