import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterContentInit
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {
  AnimationBuilder,
  style,
  animate,
  AnimationFactory
} from '@angular/animations';

export interface CarouselElement {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-carousel-galery',
  templateUrl: './carousel-galery.component.html',
  styleUrls: ['./carousel-galery.component.scss']
})
export class CarouselGaleryComponent implements AfterContentInit, OnDestroy {
  @Input() minWidth = 200;
  @Input() elements: any[] = [];

  @ViewChild('carouselContainer') carouselContainerRef: ElementRef;
  @ViewChild('carousel') carouselRef: ElementRef;

  move = 100;
  elementWidth = '200px';
  elementCount = 0;
  currentPosition = 0;
  renElements: CarouselElement[] = [];
  transitionTime = 600;

  animateLeft: AnimationFactory;
  animateRight: AnimationFactory;
  playing = false;

  private resizeSub: Subscription;

  constructor(private animationBuilder: AnimationBuilder) {
    this.elements = [];
    for (let i = 0; i < 100; i++) {
      this.elements[i] = i;
    }
  }

  ngAfterContentInit() {
    this.move = this.carouselWidth;
    this.computeSize();
    this.resizeSub = fromEvent(window, 'resize')
      .pipe(debounceTime(400))
      .subscribe(() => this.computeSize());
  }

  ngOnDestroy(): void {
    if (this.resizeSub) this.resizeSub.unsubscribe();
  }

  computeSize() {
    this.elementCount = Math.floor(this.carouselWidth / this.minWidth);
    this.elementWidth = this.carouselWidth / this.elementCount + 'px';

    if (this.currentPosition < this.elementCount) this.currentPosition = 0;

    this.renElements = this.getFromArr(
      this.elements,
      this.currentPosition - this.elementCount,
      this.elementCount * 3
    );
    this.move = -this.carouselWidth;
    this.rebuildAnimations(this.carouselWidth);
  }

  getFromArr(arr: any[], start: number, count: number) {
    const ret = [];
    for (let i = 0; i < count; i++) {
      let index = start + i;
      if (index < 0) index = arr.length - (Math.abs(index) % arr.length);
      index = index % arr.length;
      ret.push(arr[index]);
    }
    return ret;
  }

  right() {
    this.playAnimation(this.animateRight, this.elementCount);
  }

  left() {
    this.playAnimation(this.animateLeft, -this.elementCount);
  }

  playAnimation(
    animation: AnimationFactory,
    currentPositionDifferance: number
  ) {
    if (this.playing) return;
    this.playing = true;

    const player = animation.create(this.carouselRef.nativeElement);
    player.onDone(() => {
      this.currentPosition += currentPositionDifferance;
      this.renElements = this.getFromArr(
        this.elements,
        this.currentPosition - this.elementCount,
        this.elementCount * 3
      );
      player.reset();
      player.destroy();
      this.playing = false;
    });

    player.play();
  }

  rebuildAnimations(carouselWidth: number) {
    const duration = '800ms cubic-bezier(.26,.91,.47,.92)';

    this.animateLeft = this.animationBuilder.build([
      style({ transform: `translateX(-${carouselWidth}px` }),
      animate(duration, style({ transform: `translateX(0)` }))
    ]);

    this.animateRight = this.animationBuilder.build([
      style({ transform: `translateX(-${carouselWidth}px` }),
      animate(
        duration,
        style({ transform: `translateX(-${carouselWidth * 2}px)` })
      )
    ]);
  }

  get carouselStyle() {
    return {
      transform: `translateX(${this.move}px)`
    };
  }

  get carouselWidth() {
    return this.carouselContainerRef.nativeElement.clientWidth - 56;
  }
}
