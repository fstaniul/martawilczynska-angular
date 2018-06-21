import { Injectable } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Observable, of, concat } from 'rxjs';
import { switchMap, tap, takeUntil } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export interface HttpGetOptions {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]: string | string[];
      };
  reportProgress?: boolean;
  responseType: 'arraybuffer';
  withCredentials?: boolean;
}

export interface DataGetOptions {
  suffix?: string;
  prefix?: string;
  localized?: boolean;
  httpOptions?: HttpGetOptions;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _cache: any = {};

  constructor(private translateService: TranslateService, private httpClient: HttpClient) {}

  get(contentType: string, options = this.defaultOptions): Observable<any> {
    options = {
      ...this.defaultOptions,
      ...options
    };

    if (!options.localized) {
      return this.getFromHttp(contentType, options);
    } else {
      return concat(
        this.getCached(contentType, options),
        this.translateService.onLangChange.pipe(
          switchMap((event: LangChangeEvent) => this.getCached(contentType, options, event.lang))
        )
      );
    }
  }

  getCached(
    contentType: string,
    options: DataGetOptions,
    language = this.translateService.currentLang
  ): Observable<any> {
    if (options.localized && this._cache[contentType] && this._cache[contentType][language]) {
      return of(this._cache[contentType][language]);
    }

    if (!options.localized && this._cache[contentType]) {
      return of(this._cache[contentType]);
    }

    return this.getFromHttp(contentType, options, language).pipe(
      takeUntil(this.translateService.onLangChange),
      tap((data) => this.saveInCache(contentType, options, data, language))
    );
  }

  localizePath(contentType: string, options: DataGetOptions, language = this.translateService.currentLang) {
    if (options.localized) {
      return `${options.prefix}${language}/${contentType}${options.suffix}`;
    } else {
      return `${options.prefix}${contentType}${options.suffix}`;
    }
  }

  getFromHttp(contentType: string, options: DataGetOptions, language?: string): Observable<any> {
    return this.httpClient.get(this.localizePath(contentType, options, language));
  }

  saveInCache(contentType: string, options: DataGetOptions, data: any, language = this.translateService.currentLang) {
    if (options.localized) {
      this._cache = {
        ...this._cache,
        [contentType]: {
          [language]: data
        }
      };
    } else {
      this._cache = {
        ...this._cache,
        [contentType]: data
      };
    }
  }

  get defaultOptions(): DataGetOptions {
    return {
      suffix: '.json',
      prefix: '/assets/data/',
      localized: true
    };
  }
}
