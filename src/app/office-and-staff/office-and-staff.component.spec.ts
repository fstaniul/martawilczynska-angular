import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeAndStaffComponent } from './office-and-staff.component';

describe('OfficeAndStaffComponent', () => {
  let component: OfficeAndStaffComponent;
  let fixture: ComponentFixture<OfficeAndStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeAndStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeAndStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
