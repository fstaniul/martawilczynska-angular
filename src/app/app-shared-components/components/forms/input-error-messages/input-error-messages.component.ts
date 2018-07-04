import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input-error-messages',
  templateUrl: './input-error-messages.component.html',
  styleUrls: ['./input-error-messages.component.scss']
})
export class InputErrorMessagesComponent {
  @Input() control: AbstractControl;
  @Input() prefix = '';
  @Input() name = '';

  constructor() {}

  get errors() {
    if (!this.control || !this.control.errors) return [];
    else return Object.keys(this.control.errors);
  }

  translateString(error: string) {
    return [this.prefix, this.name, 'errors', error].join('.');
  }
}
