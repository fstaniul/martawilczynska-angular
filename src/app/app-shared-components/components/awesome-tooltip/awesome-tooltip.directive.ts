import { Directive, Input, HostListener, OnDestroy, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ElementRef, AfterViewInit } from '@angular/core';
import { AwesomeTooltipComponent } from './awesome-tooltip.component'

@Directive({
  selector: '[appAwesomeTooltip]'
})
export class AwesomeTooltipDirective implements OnDestroy {

  @Input('appAwesomeTooltip') tooltipItem: any = '';

  constructor(private viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver, private elementRef: ElementRef) { }

  @HostListener('mouseenter')
  onMouseEnter(): void {
      // show tooltip
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AwesomeTooltipComponent);
      const componentRef = this.viewContainerRef.createComponent(componentFactory);
      if (typeof this.tooltipItem === 'string') (<AwesomeTooltipComponent>componentRef.instance).title = this.tooltipItem;
      else (<AwesomeTooltipComponent>componentRef.instance).template = this.tooltipItem;
      (<AwesomeTooltipComponent>componentRef.instance).ref = this.elementRef;

      const domRect: ClientRect | DOMRect = document.body.getBoundingClientRect(), elemRect: ClientRect | DOMRect = this.elementRef.nativeElement.getBoundingClientRect();
      (<AwesomeTooltipComponent>componentRef.instance).pos = {
        top: this.calculatePos('top', domRect, elemRect) - 8 + 'px',
        left: Math.floor(this.elementRef.nativeElement.offsetWidth / 2) + this.calculatePos('left', domRect, elemRect) + 'px'
      };
  }

  calculatePos(attr: 'top' | 'bottom' | 'left' | 'right', domRect: ClientRect | DOMRect, elemRect: ClientRect | DOMRect): number {
    return Math.floor(elemRect[attr] - domRect[attr]);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
      // hide tooltip
      this.viewContainerRef.clear()
  }

  ngOnDestroy () {
      // hide tooltip
      this.viewContainerRef.clear()
  }

}
