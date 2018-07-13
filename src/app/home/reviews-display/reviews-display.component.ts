import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval, Observable, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { CacheService } from '../../services/cache.service';
import { arrayShuffle } from '../../utils/array-shuffle';

export interface Review {
  date: Date;
  signature: string;
  review: string;
  procedure?: string;
  score: number;
}

@Component({
  selector: 'app-reviews-display',
  templateUrl: './reviews-display.component.html',
  styleUrls: ['./reviews-display.component.scss']
})
export class ReviewsDisplayComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('carouselContainer') carouselContainer: ElementRef;
  @ViewChild('carousel') carousel: ElementRef;

  private _transform = 0;
  currentItem = 0;
  items: any[] = [1, 2, 3];
  loading = false;
  loadError = false;

  private intervalSub: Subscription;

  constructor(
    private translateService: TranslateService,
    private cacheService: CacheService,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.loading = true;
    this.getReviews().subscribe(
      (reviews) => {
        this.items = arrayShuffle(reviews).slice(0, 3);
        this.loading = false;
        this.loadError = true;
      },
      (err) => {
        this.loading = false;
        this.loadError = true;
      }
    );
  }

  getReviews(): Observable<Review[]> {
    if (this.cacheService.get('reviews')) return of(this.cacheService.get('reviews'));
    else return this.httpClient.get<Review[]>('/assets/data/reviews.json');
  }

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

  getStars(item: Review) {
    return [].fill(0, 0, item.score);
  }

  get transform(): any {
    return `translateX(-${this._transform}px)`;
  }

  get lang() {
    return this.translateService.currentLang;
  }
}
