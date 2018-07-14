import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CacheService } from '../../services/cache.service';
import { tap } from 'rxjs/operators';
import { ModalSpawnerService } from '../../app-shared-components/modal-spawner.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
  @ViewChild('imageTemplate', { read: TemplateRef })
  imageTemplate: TemplateRef<any>;

  horizontalCertificates: any;
  verticalCertificates: any;

  hover: string = null;

  constructor(private httpClient: HttpClient, private cache: CacheService, private modalSpawner: ModalSpawnerService) {}

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

  clickedImage(element: any) {
    const ctx = { image: element };
    this.modalSpawner.spawnTemplate(this.imageTemplate, ctx);
  }

  removeImage() {
    this.modalSpawner.clear();
  }

  pressedKey(event) {
    console.log(event);
  }
}
