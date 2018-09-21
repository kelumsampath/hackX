import { TestBed, inject } from '@angular/core/testing';

import { IsTeacherService } from './is-teacher.service';

describe('IsTeacherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsTeacherService]
    });
  });

  it('should be created', inject([IsTeacherService], (service: IsTeacherService) => {
    expect(service).toBeTruthy();
  }));
});
