import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { Review } from '../services/review.service';
import { Subscription, interval } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reviews-display',
  templateUrl: './reviews-display.component.html',
  styleUrls: ['./reviews-display.component.scss']
})
export class ReviewsDisplayComponent implements AfterViewInit, OnDestroy {
  @ViewChild('carouselContainer') carouselContainer: ElementRef;
  @ViewChild('carousel') carousel: ElementRef;

  private _transform = 0;
  currentItem = 0;
  items: any[] = [1, 2];

  private intervalSub: Subscription;

  constructor(private translateService: TranslateService) {}

  ngAfterViewInit() {
    this.startInterval();
  }

  ngOnDestroy() {
    this.stopInterval();
  }

  startInterval() {
    if (this.intervalSub) this.intervalSub.unsubscribe();
    this.intervalSub = interval(6000).subscribe(() => {
      this.currentItem++;
      if (this.currentItem === this.items.length) this.currentItem = 0;
      this.calculateTranslation();
    });
  }

  stopInterval() {
    if (this.intervalSub) this.intervalSub.unsubscribe();
  }

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

  get lang() {
    return this.translateService.currentLang;
  }
}
