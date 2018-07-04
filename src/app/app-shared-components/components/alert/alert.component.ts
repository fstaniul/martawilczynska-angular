import { Component, OnInit, Input } from '@angular/core';

export type AlertTypes = 'danger' | 'success' | 'info' | 'primary' | 'warning';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styles: []
})
export class AlertComponent implements OnInit {
  @Input() type: AlertTypes = 'danger';
  @Input() title = '';

  constructor() {}

  ngOnInit() {}

  get typeClass() {
    return `alert-${this.type}`;
  }
}
