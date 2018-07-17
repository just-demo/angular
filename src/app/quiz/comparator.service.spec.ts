import { TestBed, inject } from '@angular/core/testing';

import { ComparatorService } from './comparator.service';

describe('ComparatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComparatorService]
    });
  });

  it('should be created', inject([ComparatorService], (service: ComparatorService) => {
    expect(service).toBeTruthy();
  }));
});
