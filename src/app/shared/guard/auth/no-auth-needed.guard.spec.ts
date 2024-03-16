import { TestBed } from '@angular/core/testing';

import { NoAuthNeededGuard } from './no-auth-needed.guard';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('Testing no auth needed guard', () => {

  let mockRouter: jasmine.SpyObj<Router>;

  let guard: NoAuthNeededGuard;

  beforeEach(() => {

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({

      imports: [HttpClientModule],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]

    });

    guard = TestBed.inject(NoAuthNeededGuard);
    
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
