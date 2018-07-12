import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Review } from '../services/review.service';

@Component({
  selector: 'app-reviews-display',
  templateUrl: './reviews-display.component.html',
  styleUrls: ['./reviews-display.component.scss']
})
export class ReviewsDisplayComponent {
  @ViewChild('carouselContainer') carouselContainer: ElementRef;
  @ViewChild('carousel') carousel: ElementRef;

  private _transform = 0;
  currentItem = 0;
  items: any[] = [1, 2];

  constructor() {}

  moveLeft() {
    if (this.currentItem <= 0) return;
    this.currentItem--;
    this.calculateTranslation();
  }

  moveRight() {
    if (this.currentItem >= this.items.length - 1) return;
    this.currentItem++;
    this.calculateTranslation();
  }

  calculateTranslation() {
    const carouselWidth = this.carouselContainer.nativeElement.offsetWidth;
    this._transform = carouselWidth * this.currentItem;
  }

  get transform(): any {
    return `translateX(-${this._transform}px)`;
  }
}
