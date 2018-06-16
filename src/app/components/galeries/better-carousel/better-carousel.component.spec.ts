import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetterCarouselComponent } from './better-carousel.component';

describe('BetterCarouselComponent', () => {
  let component: BetterCarouselComponent;
  let fixture: ComponentFixture<BetterCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetterCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetterCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
