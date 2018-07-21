import { TestBed, async, inject } from '@angular/core/testing';

import { ActiveBookGuard } from './active-book.guard';

describe('ActiveBookGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActiveBookGuard]
    });
  });

  it('should ...', inject([ActiveBookGuard], (guard: ActiveBookGuard) => {
    expect(guard).toBeTruthy();
  }));
});
