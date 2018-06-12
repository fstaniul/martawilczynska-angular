import {
  Directive,
  HostBinding,
  HostListener,
  ElementRef
} from '@angular/core';

@Directive({
  selector: '[appNotEmpty]'
})
export class NotEmptyDirective {
  @HostBinding('class.not-empty') addNotEmpty = false;

  constructor(private el: ElementRef) {}

  @HostListener('input')
  onInput() {
    this.addNotEmpty = this.el.nativeElement.value !== '';
  }
}
