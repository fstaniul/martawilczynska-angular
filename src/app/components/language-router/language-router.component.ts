import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-locale-router',
  template: '<router-outlet></router-outlet>',
  styles: []
})
export class LanguageRouterComponent implements OnInit, OnDestroy {
  paramsSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private router: Router
  ) {
    this.paramsChange = this.paramsChange.bind(this);
  }

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.params.subscribe(
      this.paramsChange
    );
  }

  ngOnDestroy() {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  paramsChange(params: Params) {
    if (
      params.language &&
      params.language !== this.translateService.currentLang
    ) {
      if (this.translateService.langs.includes(params.language)) {
        this.translateService.use(params.language);
      } else {
        this.router.navigate([this.translateService.defaultLang]);
      }
    }
  }
}
