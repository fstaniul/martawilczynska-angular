import { Component, OnInit, ViewChild, ElementRef, forwardRef, Self, Input, Optional, Host } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { TranslatePrefixDirective } from '../directives/translate-prefix.directive';

@Component({
  selector: 'app-floating-input',
  templateUrl: './floating-input.component.html',
  styleUrls: ['./floating-input.component.scss'],
  providers: []
})
export class FloatingInputComponent implements OnInit, ControlValueAccessor {
  @Input() label;
  @Input() placeholder;

  @ViewChild('input') _input: ElementRef;
  onChange: (value: string) => void;
  onTouched: (value: string) => void;
  disabled = false;

  isFocused = false;

  constructor(
    @Self() public ngControl: NgControl,
    @Optional()
    @Host()
    public translatePrefix: TranslatePrefixDirective
  ) {
    ngControl.valueAccessor = this;
  }

  ngOnInit() {}

  writeValue(value: any): void {
    this.input.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onFocused(isFocused: boolean) {
    this.isFocused = isFocused;
  }

  hasError() {
    return !this.control.valid && (this.control.touched || this.control.dirty);
  }

  get input(): HTMLInputElement {
    return this._input && this._input.nativeElement;
  }

  get isEmpty() {
    // tslint:disable-next-line:triple-equals
    return this.input && this.input.value == '';
  }

  get control() {
    return this.ngControl.control;
  }
}
