import { TestBed, inject } from '@angular/core/testing';

import { IsParentService } from './is-parent.service';

describe('IsParentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsParentService]
    });
  });

  it('should be created', inject([IsParentService], (service: IsParentService) => {
    expect(service).toBeTruthy();
  }));
});
