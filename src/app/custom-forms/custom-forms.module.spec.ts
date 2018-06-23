import { CustomFormsModule } from './custom-forms.module';

describe('CustomFormsModule', () => {
  let customFormsModule: CustomFormsModule;

  beforeEach(() => {
    customFormsModule = new CustomFormsModule();
  });

  it('should create an instance', () => {
    expect(customFormsModule).toBeTruthy();
  });
});
