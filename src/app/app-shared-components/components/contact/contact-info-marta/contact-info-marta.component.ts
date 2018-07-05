import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contact-info-marta',
  templateUrl: './contact-info-marta.component.html',
  styleUrls: ['./contact-info-marta.component.scss']
})
export class ContactInfoMartaComponent {
  @Input() label = true;
  @Input() textClass = '';
  constructor() {}
}
