import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {
  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.translateService.addLangs(['pl', 'en']);
    this.translateService.setDefaultLang('en');

    const lang =
      (localStorage && localStorage.getItem('language')) ||
      this.translateService.defaultLang;

    if (this.translateService.langs.includes(lang)) {
      this.translateService.use(lang);
    }
  }
}
