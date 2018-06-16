import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ViewChild,
  ElementRef,
  AfterViewInit,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AnimationBuilder, style, animate, AnimationPlayer } from '@angular/animations';

@Component({
  selector: 'app-better-carousel',
  templateUrl: './better-carousel.component.html',
  styleUrls: ['./better-carousel.component.scss']
})
export class BetterCarouselComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() elements: any[];
  @Input() elementMinWidth = 200;
  @Input() template: any;

  @ViewChild('carouselContainer') carouselContainer: ElementRef;
  @ViewChild('carousel') carousel: ElementRef;

  viewElements = [];
  firstElementIndex = 0;
  elementsDisplayed = 1;
  elementWidth = '200px';
  displayCarousel = false;
  animations: {
    left: () => void;
    right: () => void;
  };

  initialized = false;
  playing = false;

  private _windowResizeSub: Subscription;

  constructor(private animationBuilder: AnimationBuilder) {}

  ngOnInit() {
    this._windowResizeSub = fromEvent(window, 'resize')
      .pipe(debounceTime(400))
      .subscribe(() => {
        this.calculateElementsWidth();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.calculateElementsWidth();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initialized = true;
      this.calculateElementsWidth();
    }, 0);
  }

  ngOnDestroy(): void {
    if (this._windowResizeSub) this._windowResizeSub.unsubscribe();
  }

  calculateElementsWidth() {
    if (!this.initialized) return;

    this.elementsDisplayed = Math.floor(this.carouselWidth / this.elementMinWidth);
    this.elementWidth = this.carouselWidth / this.elementsDisplayed + 'px';
    this.displayCarousel = this.elements.length > this.elementsDisplayed;
    this.populateView();
    this.buildAnimations();
  }

  populateView() {
    if (this.displayCarousel) {
      const elementsInView = this.elementsDisplayed * 3;
      const startIndex = this.firstElementIndex - this.elementsDisplayed;
      this.viewElements = [];

      for (let i = 0; i < elementsInView; i++) {
        let index = startIndex + i;
        if (index < 0) {
          index = this.elements.length - (Math.abs(index) % this.elements.length);
        } else {
          index = index % this.elements.length;
        }
        this.viewElements.push(this.elements[index]);
      }
    } else {
      this.viewElements = this.elements;
    }
  }

  templateContext(element) {
    return {
      element
    };
  }

  moveLeft() {
    this.animations.right();
  }

  moveRight() {
    this.animations.left();
  }

  buildAnimations() {
    const transitionTime = '800ms cubic-bezier(.2,.97,.48,.96)';
    const animationFactory = (modifier: -1 | 1) => {
      const factory = this.animationBuilder.build([
        style({ transform: `translateX(-${this.carouselWidth}px` }),
        animate(
          transitionTime,
          style({ transform: `translateX(-${this.carouselWidth + this.carouselWidth * modifier}px)` })
        )
      ]);

      return () => {
        if (this.playing) return;

        const animation = factory.create(this.carousel.nativeElement);

        animation.onDone(() => {
          this.firstElementIndex += this.elementsDisplayed * modifier;
          this.populateView();
          animation.reset();
          animation.destroy();
          this.playing = false;
        });

        this.playing = true;
        animation.play();
      };
    };

    this.animations = {
      left: animationFactory(1),
      right: animationFactory(-1)
    };
  }

  get carouselTransform() {
    return this.displayCarousel ? `translateX(-${this.carouselWidth}px)` : 'translateX(0)';
  }

  get carouselWidth(): number {
    if (!this.carouselContainer) return null;
    return (this.carouselContainer.nativeElement as HTMLElement).clientWidth - 60;
  }
}
