import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home.routing';
import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';
import { HomeReviewComponent } from './home-review/home-review.component';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, TranslateModule.forChild()],
  declarations: [HomeComponent, HomeReviewComponent]
})
export class HomeModule {}
