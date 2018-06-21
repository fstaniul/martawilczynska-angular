import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsDisplayComponent } from './reviews-display.component';

describe('ReviewsDisplayComponent', () => {
  let component: ReviewsDisplayComponent;
  let fixture: ComponentFixture<ReviewsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
