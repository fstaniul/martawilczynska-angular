import {
  Component,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

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
export class PhotoGaleryComponent implements OnChanges, OnDestroy {
  @Input() photos: PhotoData[] = [];
  renPhotos: PhotoData[] = [];
  current = -1;

  intervalReset = new Subject<void>();
  intervalSub: Subscription;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.photos) {
      this.intervalReset.next();
      this.next(0);
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
