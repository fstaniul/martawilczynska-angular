import { Injectable, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService implements OnDestroy {
  private _titleSubscription: Subscription;

  constructor(private translateService: TranslateService) {
    this._titleSubscription = translateService
      .get('page.title')
      .subscribe((title) => {
        document.title = 'Marta Wilczyńska - ' + title;
      });
  }

  ngOnDestroy() {
    if (this._titleSubscription) {
      this._titleSubscription.unsubscribe();
    }
  }
}
