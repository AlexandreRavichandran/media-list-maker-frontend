import { TestBed } from '@angular/core/testing';

import { NoAuthNeededGuard } from './no-auth-needed.guard';

describe('NoAuthNeededGuard', () => {
  let guard: NoAuthNeededGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoAuthNeededGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
