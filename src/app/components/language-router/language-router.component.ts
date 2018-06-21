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
  ) {}

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      this.setLanguage(params.language);
    });
    this.setLanguage(this.activatedRoute.snapshot.params.language);
  }

  ngOnDestroy() {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  setLanguage(lang: string) {
    if (this.translateService.langs.includes(lang)) {
      if (this.translateService.currentLang !== lang) {
        this.translateService.use(lang);
      }
    } else {
      this.router.navigate([this.translateService.defaultLang]);
    }
  }
}
