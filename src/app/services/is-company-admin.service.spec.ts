import { TestBed, inject } from '@angular/core/testing';

import { IsCompanyAdminService } from './is-company-admin.service';

describe('IsCompanyAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsCompanyAdminService]
    });
  });

  it('should be created', inject([IsCompanyAdminService], (service: IsCompanyAdminService) => {
    expect(service).toBeTruthy();
  }));
});
