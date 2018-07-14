import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalSpawnerService } from './app-shared-components/modal-spawner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {
  @ViewChild('attachContainer', { read: ViewContainerRef })
  attachContainerRef: ViewContainerRef;

  constructor(private translateService: TranslateService, private modalSpawnerService: ModalSpawnerService) {}

  ngOnInit() {
    this.translateService.addLangs(['pl', 'en']);
    this.translateService.setDefaultLang('pl');
    this.modalSpawnerService.viewContainer = this.attachContainerRef;
    console.log('Attach contianer ref: ', this.attachContainerRef);
  }
}
