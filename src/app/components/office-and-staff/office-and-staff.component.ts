import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PhotoData } from '../galeries/photo-galery/photo-galery.component';
import { HttpClient } from '@angular/common/http';
import { CacheService } from '../../services/cache.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-office-and-staff',
  templateUrl: './office-and-staff.component.html',
  styleUrls: ['./office-and-staff.component.scss']
})
export class OfficeAndStaffComponent implements OnInit {
  CACHE_PROPERTY = 'office-and-staff-cached-photos';
  PHOTOS_URL = '/assets/data/office-and-staff-photos.json';

  photos: PhotoData[] = [];

  constructor(
    private translateService: TranslateService,
    private httpClient: HttpClient,
    private cache: CacheService
  ) {}

  ngOnInit() {
    this.photos = this.cache.get(this.CACHE_PROPERTY) || [];

    if (this.photos.length === 0) {
      this.httpClient
        .get(this.PHOTOS_URL)
        .pipe(tap((data) => this.cache.save(this.CACHE_PROPERTY, data)))
        .subscribe((photos: PhotoData[]) => {
          this.photos = photos;
        });
    }
  }

  localizeLink(link: string) {
    return `/${this.translateService.currentLang}/${link}`;
  }
}
