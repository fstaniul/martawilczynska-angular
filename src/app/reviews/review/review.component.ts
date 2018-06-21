import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  @Input() text = '';
  @Input() signature = '';
  @Input() score = 0;

  private _maxScore = 5;

  constructor() {}

  ngOnInit() {}

  arrayOf(number: number) {
    return new Array(number).map((_, i) => i);
  }

  get scoredStars() {
    return this.arrayOf(Math.floor(+this.score));
  }

  get remainingStars() {
    return this.arrayOf(this._maxScore - Math.ceil(+this.score));
  }

  get isHalfScore() {
    // tslint:disable-next-line:triple-equals
    return this.score != Math.floor(this.score);
  }
}
