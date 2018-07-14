import { Component, Self, Renderer2, ViewChild, ElementRef, Input, Host, Optional, forwardRef } from '@angular/core';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';
import { TranslatePrefixDirective } from '../directives/translate-prefix.directive';
import { COMPONENT_WITH_PLACEHOLDER, IComponentWithPlaceholder } from '../ComponentWithPlaceholder';

@Component({
  selector: 'app-input-with-error',
  templateUrl: './input-with-error.component.html',
  styleUrls: ['./input-with-error.component.scss'],
  providers: [{ provide: COMPONENT_WITH_PLACEHOLDER, useExisting: forwardRef(() => InputWithErrorComponent) }]
})
export class InputWithErrorComponent implements ControlValueAccessor, IComponentWithPlaceholder {
  @ViewChild('input') input: ElementRef;

  onChangeCb: (value: string) => void;
  onTouchCb: () => void;

  disabled = false;

  // tslint:disable-next-line:no-input-rename
  @Input('placeholder') placeholder = '';
  @Input() type = 'text';

  required = false;

  constructor(
    @Self() private ngControl: NgControl,
    private renderer2: Renderer2,
    @Host()
    @Optional()
    private translateDir: TranslatePrefixDirective
  ) {
    this.ngControl.valueAccessor = this;
    if (Array.isArray(this.ngControl.validator) && this.ngControl.validator.includes(Validators.required)) {
      this.required = true;
    }
  }

  writeValue(value: string) {
    this.renderer2.setValue(this.input.nativeElement, value);
  }

  registerOnChange(fn: any) {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchCb = fn;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  translateKeys(keys: string[]) {
    if (!this.translateDir) return keys;
    else return keys.map((k) => this.translateKey(k, 'error'));
  }

  translateKey(key: string, prefix?: string) {
    if (!this.translateDir) return key;
    return `${this.translateDir.prefix}.${this.ngControl.name}.${prefix ? prefix + '.' : ''}${key}`;
  }

  get errors() {
    return this.ngControl.control.invalid ? this.translateKeys(Object.keys(this.ngControl.control.errors)) : [];
  }

  get hasError() {
    return this.ngControl.control.invalid && (this.ngControl.control.touched || this.ngControl.control.dirty);
  }
}
