import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private _cache: {
    [key: string]: any;
  } = {};

  constructor() {}

  get(resource: string): any {
    const cachedResource = this._cache[resource];
    if (cachedResource) {
      return Array.isArray(cachedResource)
        ? [...cachedResource]
        : { ...cachedResource };
    }
    return null;
  }

  save(resource: string, data: any, overide = false): void {
    if (this._cache[resource] && !overide) {
      console.warn(
        'Tried to override resource without setting it to be overridden.'
      );
      console.warn('Resource:', resource);
      console.warn('Data:', data);
      throw new Error(
        `Failed to cache resource: ${resource}, cause it was already cached!`
      );
    }

    this._cache[resource] = Array.isArray(data) ? [...data] : { ...data };
  }
}
