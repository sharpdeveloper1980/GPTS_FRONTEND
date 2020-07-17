import { TestBed } from '@angular/core/testing';

import { BreadcrumService } from './breadcrum.service';

describe('BreadcrumService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BreadcrumService = TestBed.get(BreadcrumService);
    expect(service).toBeTruthy();
  });
});
