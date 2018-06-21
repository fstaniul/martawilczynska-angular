import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent implements OnInit {
  alts = {
    pl: 'Polski',
    en: 'English'
  };

  constructor(private translateService: TranslateService, private router: Router) {}

  ngOnInit() {}

  flag(language: string) {
    return `/assets/i18n/flags/${language}.png`;
  }

  alt(language: string) {
    return this.alts[language];
  }

  link(language: string) {
    const chunks = this.router.url.split('/');
    if (chunks.length < 2) {
      return `/${language}`;
    } else return `/${language}/${chunks.slice(2).join('/')}`;
  }

  isCurrentLang(language: string) {
    return this.translateService.currentLang === language;
  }

  get languages() {
    return this.translateService.langs;
  }
}
