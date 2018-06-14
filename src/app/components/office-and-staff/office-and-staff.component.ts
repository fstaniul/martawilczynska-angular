import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-office-and-staff',
  templateUrl: './office-and-staff.component.html',
  styleUrls: ['./office-and-staff.component.scss']
})
export class OfficeAndStaffComponent {
  constructor(private translateService: TranslateService) {}

  localizeLink(link: string) {
    return `/${this.translateService.currentLang}/${link}`;
  }
}
