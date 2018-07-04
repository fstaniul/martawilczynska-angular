import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CacheService } from '../../services/cache.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
  horizontalCertificates: any;
  verticalCertificates: any;

  constructor(private httpClient: HttpClient, private cache: CacheService) {}

  ngOnInit() {
    // load certificates
    const certificatesCacheId = 'about-me-certificates';
    const certificates = this.cache.get(certificatesCacheId);

    if (!certificates) {
      this.httpClient
        .get('/assets/data/certificates.json')
        .pipe(tap((c) => this.cache.save(certificatesCacheId, c)))
        .subscribe((c: any) => {
          this.verticalCertificates = c.vertical;
          this.horizontalCertificates = c.horizontal;
        });
    } else {
      this.horizontalCertificates = certificates.horizontal;
      this.verticalCertificates = certificates.vertical;
    }
  }

  clickOnCertificate(certificateIndex: number) {}
}
