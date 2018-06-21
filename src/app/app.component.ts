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
    this.translateService.setDefaultLang('pl');
  }
}
