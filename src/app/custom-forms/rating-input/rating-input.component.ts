import { Component, OnInit, Input, OnChanges, SimpleChanges, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { transition, trigger, state, style, animate, query, keyframes } from '@angular/animations';

const starAnimation = trigger('starAnimation', [
  transition('* => 1', [
    animate(
      800,
      keyframes([
        style({ transform: 'scale3d(1, 1, 1)', offset: 0 }),
        style({ transform: 'scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)', offset: 0.1 }),
        style({ transform: 'scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)', offset: 0.2 }),
        style({ transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)', offset: 0.3 }),
        style({ transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)', offset: 0.4 }),
        style({ transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)', offset: 0.5 }),
        style({ transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)', offset: 0.6 }),
        style({ transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)', offset: 0.7 }),
        style({ transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)', offset: 0.8 }),
        style({ transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)', offset: 0.9 }),
        style({ transform: 'scale3d(1, 1, 1)', offset: 1 })
      ])
    )
  ]),
  transition('1 => *', [])
]);

interface Rating {
  rating: number;
  animate: boolean;
}

@Component({
  selector: 'app-rating-input',
  templateUrl: './rating-input.component.html',
  styleUrls: ['./rating-input.component.scss'],
  animations: [starAnimation]
})
export class RatingInputComponent implements ControlValueAccessor, OnChanges {
  @Input() maxRating = 5;
  @Input() disabled = false;

  displayValue = 0;
  value = 0;

  onchangecallback: (value: number) => void;
  ontouchedcallback: () => void;

  animations: number[] = [];

  constructor(@Self() private ngControl: NgControl) {
    ngControl.valueAccessor = this;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.maxRating) {
      this.animations = [];
      for (let i = 1; i <= changes.maxRating.currentValue; i++) {
        this.animations[i] = 0;
      }
    }
  }

  writeValue(value: any) {
    if (typeof value !== 'number' && value !== null && typeof value !== 'undefined') {
      throw new Error('Value passed to RatingInputComponent must be a number!');
    }

    this.value = value;
    this.displayValue = value;
  }

  registerOnChange(fn: any) {
    this.onchangecallback = fn;
  }

  registerOnTouched(fn: any) {
    this.ontouchedcallback = fn;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  getRatingArr(): any[] {
    const ret: any[] = [];
    for (let i = 1; i <= this.maxRating; i++) {
      ret.push(i);
    }
    return ret;
  }

  getRatingClasses(rating: number): any {
    return {
      'text-primary': rating <= this.displayValue,
      'text-light': rating > this.displayValue && rating > this.value,
      'text-secondary': rating <= this.value && rating > this.displayValue
    };
  }

  onClick(rating: number) {
    this.displayValue = rating;
    this.value = rating;
    if (this.onchangecallback) this.onchangecallback(rating);
    this.startAnimations(rating);
  }

  startAnimations(rating) {
    for (let i = 1; i <= rating; i++) {
      this.animations[i] = 1;
    }
  }

  stopAnimations(rating: number) {
    for (let i = 1; i <= rating; i++) {
      this.animations[i] = 0;
    }
  }

  get isInvalid() {
    return this.ngControl.control.invalid && (this.ngControl.touched || this.ngControl.dirty);
  }
}
