import {
  Directive,
  HostBinding,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  Self
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appNotEmpty]'
})
export class NotEmptyDirective implements AfterViewInit, OnDestroy {
  @HostBinding('class.not-empty') addNotEmpty = false;

  private subscription: Subscription;

  constructor(private el: ElementRef, @Self() private ngControl: NgControl) {}

  ngAfterViewInit() {
    this.subscription = this.ngControl.control.valueChanges.subscribe(
      (value) => {
        this.addNotEmpty = value && value !== '';
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
