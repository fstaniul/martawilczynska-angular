import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contact-info-clinic',
  templateUrl: './contact-info-clinic.component.html',
  styleUrls: ['./contact-info-clinic.component.scss']
})
export class ContactInfoClinicComponent {
  @Input() label = true;
  @Input() textClass = '';
  constructor() {}
}
