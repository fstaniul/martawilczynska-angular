import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselGaleryComponent } from './carousel-galery.component';

describe('CarouselGaleryComponent', () => {
  let component: CarouselGaleryComponent;
  let fixture: ComponentFixture<CarouselGaleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselGaleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselGaleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
