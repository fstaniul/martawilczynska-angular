import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subject, Subscription } from 'rxjs';
import { tap, map, takeUntil } from 'rxjs/operators';

import { CacheService } from '../../../services/cache.service';
import {
  trigger,
  transition,
  query,
  style,
  group,
  animate
} from '@angular/animations';

export interface PhotoData {
  src: string;
  description?: {
    [key: string]: {
      title?: string;
      text: string;
    };
  };
}

const animateGalery = trigger('animateGalery', [
  transition('* => *', [
    group([
      query(
        ':enter',
        [style({ opacity: 0 }), animate('600ms', style({ opacity: 1 }))],
        { optional: true }
      ),
      query(
        ':leave',
        [style({ opacity: 1 }), animate('600ms', style({ opacity: 0 }))],
        { optional: true }
      )
    ])
  ])
]);

@Component({
  selector: 'app-photo-galery',
  templateUrl: './photo-galery.component.html',
  styleUrls: ['./photo-galery.component.scss'],
  animations: [animateGalery]
})
export class PhotoGaleryComponent implements OnInit, OnDestroy {
  CACHE_PROPERTY = 'office-and-staff-cached-photos';
  PHOTOS_URL = '/assets/office-and-staff-photos.json';

  photos: PhotoData[] = [];
  renPhotos: PhotoData[] = [];
  current = -1;

  intervalReset = new Subject<void>();
  intervalSub: Subscription;

  constructor(private httpClient: HttpClient, private cache: CacheService) {}

  ngOnInit() {
    this.photos = this.cache.get(this.CACHE_PROPERTY) || [];

    console.log('Cached: ', this.photos);

    if (this.photos.length === 0) {
      this.httpClient
        .get(this.PHOTOS_URL)
        .pipe(tap((data) => this.cache.save(this.CACHE_PROPERTY, data)))
        .subscribe((photos: PhotoData[]) => {
          this.photos = photos;
          console.log(this.photos);
          this.insertNext(0);
          this.startInterval();
        });
    } else {
      this.insertNext(0);
      this.startInterval();
    }
  }

  ngOnDestroy() {
    if (this.intervalSub) this.intervalSub.unsubscribe();
    this.intervalReset.unsubscribe();
  }

  startInterval() {
    if (this.photos.length < 2) return;

    if (this.intervalSub) this.intervalSub.unsubscribe();
    this.intervalSub = interval(5000)
      .pipe(
        map(() => this.current + 1),
        takeUntil(this.intervalReset)
      )
      .subscribe((next) => this.insertNext(next));
  }

  next(photoNumber: number) {
    this.intervalReset.next();
    this.insertNext(photoNumber);
    this.startInterval();
  }

  insertNext(next: number) {
    next = next % this.photos.length;
    if (this.photos.length === 0) return;

    this.renPhotos = [this.photos[next]];
    this.current = next;
  }

  backgroundImage(src: string) {
    return {
      'background-image': `url('${src}')`
    };
  }
}
