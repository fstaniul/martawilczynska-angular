import { OfficeAndStaffModule } from './office-and-staff.module';

describe('OfficeAndStaffModule', () => {
  let officeAndStaffModule: OfficeAndStaffModule;

  beforeEach(() => {
    officeAndStaffModule = new OfficeAndStaffModule();
  });

  it('should create an instance', () => {
    expect(officeAndStaffModule).toBeTruthy();
  });
});
