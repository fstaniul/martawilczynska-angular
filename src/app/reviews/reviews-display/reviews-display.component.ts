import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Review } from '../services/review.service';

@Component({
  selector: 'app-reviews-display',
  templateUrl: './reviews-display.component.html',
  styleUrls: ['./reviews-display.component.scss']
})
export class ReviewsDisplayComponent implements OnInit, OnChanges {
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() elementsCount = 3;
  @Input() reviews: Review[] = [];

  viewElements: Review[] = [];
  currentViewElement = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.orientation) {
      const v = changes.orientation.currentValue;
      if (v !== 'horizontal' && v !== 'vertical') {
        this.orientation = 'horizontal';
      }
    }

    if (changes.elementsCount) {
      const v = changes.elementsCount.currentValue;
      if (typeof v === 'string') this.elementsCount = Number.parseInt(v);
      if (typeof v !== 'number') this.elementsCount = 3;
    }
  }

  ngOnInit() {}

  get containerClasses() {
    return {
      'flex-row': this.orientation === 'horizontal',
      'flex-column': this.orientation === 'vertical'
    };
  }
}
