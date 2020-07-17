import { CollegeDashboardModule } from './college-dashboard.module';

describe('CollegeDashboardModule', () => {
  let collegeDashboardModule: CollegeDashboardModule;

  beforeEach(() => {
    collegeDashboardModule = new CollegeDashboardModule();
  });

  it('should create an instance', () => {
    expect(collegeDashboardModule).toBeTruthy();
  });
});
