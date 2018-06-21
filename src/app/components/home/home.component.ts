import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private translateService: TranslateService) {}

  get proceduresLink() {
    return `/${this.translateService.currentLang}/surgical-procedures`;
  }

  get contactLink() {
    return `/${this.translateService.currentLang}/contact`;
  }
}
