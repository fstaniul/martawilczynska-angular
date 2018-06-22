import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import { AnimationBuilder, style, animate } from '@angular/animations';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-netflixstyle-carousel-galery',
  templateUrl: './netflixstyle-carousel-galery.component.html',
  styleUrls: ['./netflixstyle-carousel-galery.component.scss']
})
export class NetflixstyleCarouselGaleryComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() elements: any[];
  @Input() template: any;
  @Input() elementMinWidth = 200;
  @Input() hideSteps = false;

  @ViewChild('carouselContainer') carouselContainer: ElementRef;
  @ViewChild('carousel') carousel: ElementRef;

  elementsDisplayed = 0;
  elementWidth = 0;
  startIndex = 0;
  viewElements: any[] = [];

  playing = false;

  private _windowResizeSubscription: Subscription;

  constructor(private animationBuilder: AnimationBuilder) {}

  ngOnInit(): void {
    this._windowResizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(400))
      .subscribe(() => {
        this.calculateAndPopulate();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.elements || changes.elementMinWidth) {
      this.calculateAndPopulate();
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.calculateAndPopulate();
    }, 1);
  }

  ngOnDestroy() {
    if (this._windowResizeSubscription) this._windowResizeSubscription.unsubscribe();
  }

  calculateAndPopulate() {
    if (!this.isReady()) return;

    this.elementsDisplayed = Math.floor(this.containerWidth / this.elementMinWidth);
    this.elementWidth = this.containerWidth / this.elementsDisplayed;
    this.populateViewElements();
  }

  populateViewElements() {
    // Dont bother rendering more if they make it in view
    if (this.elements.length <= this.elementsDisplayed) {
      this.viewElements = this.elements.slice(0).map((element, id) => ({ id, element }));
      return;
    }

    let fromIndex = this.startIndex - this.elementsDisplayed;
    if (fromIndex < 0) fromIndex = (this.elements.length + fromIndex) % this.elements.length;

    const elementsToView = this.elementsDisplayed * 3;
    const ret = [];
    for (let i = 0; i < elementsToView; i++) {
      const index = (fromIndex + i) % this.elements.length;
      ret.push({ id: index, element: this.elements[index] });
    }

    this.viewElements = ret;
  }

  isReady() {
    return !!(
      this.carousel &&
      this.carouselContainer &&
      this.carouselContainer.nativeElement &&
      this.carousel.nativeElement &&
      this.elements &&
      this.elements.length
    );
  }

  right() {
    let destination, transform;

    if (this.elements.length === this.elementsDisplayed + this.startIndex) {
      destination = 0;
      transform = -(this.elementWidth * this.elementsDisplayed);
    } else if (this.startIndex + this.elementsDisplayed > this.elements.length - this.elementsDisplayed) {
      destination = this.elements.length - this.elementsDisplayed;
      transform = -(this.elementWidth * (destination - this.startIndex));
    } else {
      destination = this.startIndex + this.elementsDisplayed;
      transform = -(this.elementWidth * this.elementsDisplayed);
    }

    this.createAttachAndPlayAnimation(destination, transform);
  }

  left() {
    let destination, transform;

    if (this.startIndex === 0) {
      destination = this.elements.length - this.elementsDisplayed;
      transform = this.elementWidth * this.elementsDisplayed;
    } else if (this.startIndex < this.elementsDisplayed) {
      destination = 0;
      transform = this.elementWidth * this.startIndex;
    } else {
      destination = this.startIndex - this.elementsDisplayed;
      transform = this.elementWidth * this.elementsDisplayed;
    }

    this.createAttachAndPlayAnimation(destination, transform);
  }

  goToStep(step: number) {
    if (step === this.activeStep) return;
    const destination = step * this.elementsDisplayed;
    this.startIndex = destination;
    this.populateViewElements();
  }

  createAttachAndPlayAnimation(destination: number, transform: number) {
    if (this.playing) return;

    const animationTransition = '800ms cubic-bezier(.2,.97,.48,.96)';

    const animation = this.animationBuilder
      .build([
        style({ transform: `translateX(${-this.containerWidth}px)` }),
        animate(animationTransition, style({ transform: `translateX(${-this.containerWidth + transform}px)` }))
      ])
      .create(this.carousel.nativeElement);

    animation.onDone(() => {
      this.startIndex = destination;
      this.populateViewElements();
      this.playing = false;
      animation.reset();
      animation.destroy();
    });
    this.playing = true;
    animation.play();
  }

  templateContext(viewElement: { id: number; element: any }) {
    return viewElement;
  }

  get containerWidth() {
    return (this.carouselContainer.nativeElement as HTMLElement).clientWidth - 60;
  }

  get displayAsCarousel() {
    return this.elements && this.elementsDisplayed && this.elements.length > this.elementsDisplayed;
  }

  get carouselStyle() {
    if (
      !this.carousel ||
      !this.carouselContainer ||
      !this.carousel.nativeElement ||
      !this.carouselContainer.nativeElement
    ) {
      return {};
    } else if (!this.displayAsCarousel) {
      return {
        width: '100%',
        'justify-content': 'center'
      };
    } else {
      return {
        transform: `translateX(${-this.containerWidth}px)`
      };
    }
  }

  stepsArry() {
    return new Array(this.steps);
  }

  get steps() {
    if (!this.elementsDisplayed) return 0;
    return Math.ceil(this.elements.length / this.elementsDisplayed);
  }

  get activeStep() {
    if (!this.elementsDisplayed) return 0;
    return Math.ceil(this.startIndex / this.elementsDisplayed);
  }
}
