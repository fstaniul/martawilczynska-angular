import { Directive, OnInit, OnDestroy, Self, HostBinding, Host, Inject } from '@angular/core';
import { NgControl } from '@angular/forms';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { TranslatePrefixDirective } from './translate-prefix.directive';
import { COMPONENT_WITH_PLACEHOLDER, IComponentWithPlaceholder } from '../ComponentWithPlaceholder';
import { take } from '../../../../node_modules/rxjs/operators';
import { Placeholder } from '../../../../node_modules/@angular/compiler/src/i18n/i18n_ast';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[translatePlaceholder]'
})
export class TranslatePlaceholderDirective implements OnInit, OnDestroy {
  private langSub: Subscription;

  constructor(
    private translateService: TranslateService,
    @Self() private ngControl: NgControl,
    @Host() private prefix: TranslatePrefixDirective,
    @Inject(COMPONENT_WITH_PLACEHOLDER)
    @Self()
    private cwp: IComponentWithPlaceholder
  ) {}

  ngOnInit() {
    this.translateService
      .get(this.prefix.prefix + '.' + this.ngControl.name + '.placeholder')
      .pipe(take(1))
      .subscribe((placeholder) => (this.cwp.placeholder = placeholder));
    this.langSub = this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateService
        .get(this.prefix.prefix + '.' + this.ngControl.name + '.placeholder')
        .pipe(take(1))
        .subscribe((placeholder) => (this.cwp.placeholder = placeholder));
    });
  }

  ngOnDestroy() {
    if (this.langSub) this.langSub.unsubscribe();
  }
}
