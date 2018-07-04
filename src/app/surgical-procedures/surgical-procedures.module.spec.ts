import { SurgicalProceduresModule } from './surgical-procedures.module';

describe('SurgicalProceduresModule', () => {
  let surgicalProceduresModule: SurgicalProceduresModule;

  beforeEach(() => {
    surgicalProceduresModule = new SurgicalProceduresModule();
  });

  it('should create an instance', () => {
    expect(surgicalProceduresModule).toBeTruthy();
  });
});
