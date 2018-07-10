import { Component, OnInit } from '@angular/core';
import { trigger, transition, state, style, animate, animateChild } from '@angular/animations';

const animateLogoBackground = trigger('animateLogoBackground', [
  state('true', style({ width: 'calc(100% + 2px)' })),
  state('false', style({ width: '100px' })),
  transition('false => true', [animate('250ms cubic-bezier(.34,.97,.37,.99)'), animateChild()]),
  transition('true => false', [animateChild(), animate('250ms cubic-bezier(.34,.97,.37,.99)')])
]);

const animateLogoText = trigger('animateLogoText', [
  state('true', style({ width: '*' })),
  state('false', style({ width: '0px' })),
  transition('* => *', animate('100ms'))
]);

@Component({
  selector: 'app-home-review',
  templateUrl: './home-review.component.html',
  styleUrls: ['./home-review.component.scss'],
  animations: [animateLogoBackground, animateLogoText]
})
export class HomeReviewComponent implements OnInit {
  displayLogoText = false;
  spreadLogo = false;
  constructor() {}

  ngOnInit() {}
}
