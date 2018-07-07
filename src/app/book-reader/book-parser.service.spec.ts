import { TestBed, inject } from '@angular/core/testing';

import { BookParserService } from './book-parser.service';

describe('BookParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookParserService]
    });
  });

  it('should be created', inject([BookParserService], (service: BookParserService) => {
    expect(service).toBeTruthy();
  }));
});
