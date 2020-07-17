import { SchoolDashboardModule } from './school-dashboard.module';

describe('SchoolDashboardModule', () => {
  let schoolDashboardModule: SchoolDashboardModule;

  beforeEach(() => {
    schoolDashboardModule = new SchoolDashboardModule();
  });

  it('should create an instance', () => {
    expect(schoolDashboardModule).toBeTruthy();
  });
});
