import { TestBed, inject } from '@angular/core/testing';

import { PaginationHelperService } from './pagination-helper.service';

describe('PaginationHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaginationHelperService]
    });
  });

  it('should be created', inject([PaginationHelperService], (service: PaginationHelperService) => {
    expect(service).toBeTruthy();
  }));
});
