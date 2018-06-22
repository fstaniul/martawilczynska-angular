import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial-redirect',
  template: '',
  styles: ['']
})
export class InitialRedirectComponent implements OnInit {
  constructor(private translateService: TranslateService, private router: Router) {}
  ngOnInit() {
    let lang;

    if (localStorage && localStorage.getItem('lang')) {
      lang = localStorage.getItem('lang');
    }

    lang = lang || this.translateService.defaultLang;

    if (!this.translateService.langs.includes(lang)) lang = this.translateService.defaultLang;

    if (localStorage) localStorage.setItem('lang', lang);

    this.translateService.use(lang);
    this.router.navigate([lang]);
  }
}
