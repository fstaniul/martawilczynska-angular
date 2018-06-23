import { Directive, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[translatePrefix]'
})
export class TranslatePrefixDirective {
  // tslint:disable-next-line:no-input-rename
  @Input('translatePrefix') prefix;
  constructor() {}
}
