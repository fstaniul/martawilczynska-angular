import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.scss']
})
export class PageLoaderComponent implements OnInit {
  @Input() loading = false;
  @Input() loaded = false;
  @Input() error: Error | any = null;
  @Output() reload = new EventEmitter<any>();

  constructor() {}
  ngOnInit() {}

  get state(): 'initial' | 'loading' | 'success' | 'error' {
    if (this.loading) return 'loading';
    if (this.loaded && !this.error) return 'success';
    if (this.loaded && this.error) return 'error';

    console.log(this.loading, this.loaded, this.error);

    return 'initial';
  }
}
