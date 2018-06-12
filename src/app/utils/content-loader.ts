import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService, DataGetOptions } from '../services/data.service';

export class ContentLoader implements OnInit, OnDestroy {
  content: any;
  loading = false;
  loaded = false;
  error: Error | any;

  private _contentSubscription: Subscription;

  constructor(
    private _dataService: DataService,
    private _contentType: string,
    private _options?: DataGetOptions
  ) {}

  ngOnInit() {
    this.reload();
  }

  ngOnDestroy() {
    if (this._contentSubscription) this._contentSubscription.unsubscribe();
  }

  reload() {
    this.loading = true;
    if (this._contentSubscription) this._contentSubscription.unsubscribe();
    this._contentSubscription = this._dataService
      .get(this._contentType, this._options)
      .subscribe(
        (content) => {
          this.content = content;
          this.error = null;
          this.loaded = true;
          this.loading = false;
        },
        (error) => {
          this.error = error;
          this.loaded = true;
          this.loading = false;
        }
      );
  }
}
