import { Component, OnInit, Input, ViewChild, ElementRef, Self, Host, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { TranslatePrefixDirective } from '../directives/translate-prefix.directive';

@Component({
  selector: 'app-floating-textarea',
  templateUrl: './floating-textarea.component.html',
  styleUrls: ['./floating-textarea.component.scss']
})
export class FloatingTextareaComponent implements ControlValueAccessor {
  @Input() placeholder;
  @Input() label;
  @Input() cols;
  @Input() rows = 6;
  @Input() disabled = false;

  @ViewChild('textarea') textarea: ElementRef;

  onChangeCb: Function;
  onTouchedCb: Function;

  focused = false;

  constructor(
    @Self() public ngControl: NgControl,
    @Optional()
    @Host()
    public translatePrefix: TranslatePrefixDirective
  ) {
    ngControl.valueAccessor = this;
  }

  onInput(value: string) {
    if (this.onChangeCb) this.onChangeCb(value);
  }

  registerOnChange(fn: Function) {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouchedCb = fn;
  }

  writeValue(value: string) {
    this.textarea.nativeElement.value = value;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  onFocus() {
    this.focused = true;
  }

  onBlur() {
    this.focused = false;
    if (this.onTouchedCb) this.onTouchedCb();
  }

  isEmpty() {
    return this.textarea.nativeElement.value == '';
  }

  hasErrors() {
    return !this.ngControl.control.valid && (this.ngControl.control.touched || this.ngControl.control.dirty);
  }
}
