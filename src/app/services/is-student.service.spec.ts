import { TestBed, inject } from '@angular/core/testing';

import { IsStudentService } from './is-student.service';

describe('IsStudentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsStudentService]
    });
  });

  it('should be created', inject([IsStudentService], (service: IsStudentService) => {
    expect(service).toBeTruthy();
  }));
});
