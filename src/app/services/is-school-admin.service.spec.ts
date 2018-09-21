import { TestBed, inject } from '@angular/core/testing';

import { IsSchoolAdminService } from './is-school-admin.service';

describe('IsSchoolAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsSchoolAdminService]
    });
  });

  it('should be created', inject([IsSchoolAdminService], (service: IsSchoolAdminService) => {
    expect(service).toBeTruthy();
  }));
});
