import { Component, Host, Input, Optional } from '@angular/core';
import { NgControl, AbstractControl } from '@angular/forms';
import { TranslatePrefixDirective } from '../directives/translate-prefix.directive';

@Component({
  selector: 'app-error-list',
  templateUrl: './error-list.component.html',
  styleUrls: ['./error-list.component.scss']
})
export class ErrorListComponent {
  @Input() name;
  @Input() control: NgControl;
  @Input() tslDir: TranslatePrefixDirective;

  constructor(
    @Host()
    @Optional()
    tslDir: TranslatePrefixDirective
  ) {
    this.tslDir = tslDir;
  }

  get showError() {
    return this.control.invalid && (this.control.touched || this.control.dirty);
  }

  get errors() {
    return this.control.errors && Object.keys(this.control.errors);
  }

  translateError(error: string) {
    if (!this.tslDir) return error;
    return `${this.tslDir.prefix}.${this.control.name || this.name}.errors.${error}`;
  }
}
