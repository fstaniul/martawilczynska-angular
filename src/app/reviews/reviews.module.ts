import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReviewComponent } from './review/review.component';
import { ReviewsComponent } from './reviews.component';
import { ReviewAddComponent } from './review-add/review-add.component';
import { ReviewViewComponent } from './review-view/review-view.component';
import { ReviewService } from './services/review.service';
import { ReviewsDisplayComponent } from './reviews-display/reviews-display.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CustomFormsModule } from '../custom-forms/custom-forms.module';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, TranslateModule.forChild(), CustomFormsModule, NgbModule],
  declarations: [ReviewComponent, ReviewsComponent, ReviewAddComponent, ReviewViewComponent, ReviewsDisplayComponent]
})
export class ReviewsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ReviewsModule,
      providers: [ReviewService]
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: ReviewsModule,
      providers: []
    };
  }
}
