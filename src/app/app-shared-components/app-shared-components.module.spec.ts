import { AppSharedComponentsModule } from './app-shared-components.module';

describe('AppSharedComponentsModule', () => {
  let appSharedComponentsModule: AppSharedComponentsModule;

  beforeEach(() => {
    appSharedComponentsModule = new AppSharedComponentsModule();
  });

  it('should create an instance', () => {
    expect(appSharedComponentsModule).toBeTruthy();
  });
});
