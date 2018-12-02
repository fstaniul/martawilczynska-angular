import { Component, OnInit, AfterViewInit, Input, HostListener, ElementRef, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-awesome-tooltip',
  templateUrl: './awesome-tooltip.component.html',
  styleUrls: ['./awesome-tooltip.component.scss']
})
export class AwesomeTooltipComponent {

  @Input() title: string;
  @Input() ref: ElementRef;
  @Input() template: TemplateRef<any>;
  @Input() pos: {top?: string; left?: string; right?: string; bottom?: string; transform?: string} = {};

  constructor() { }
}
