import { TestBed } from '@angular/core/testing';

import { NoAuthNeededGuard } from './no-auth-needed.guard';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';

describe('Testing no auth needed guard', () => {

  let mockRouter: jasmine.SpyObj<Router>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  let guard: NoAuthNeededGuard;

  beforeEach(() => {

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['getAuthenticatedUserToken']);

    TestBed.configureTestingModule({

      imports: [HttpClientModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService }
      ]

    });

    guard = TestBed.inject(NoAuthNeededGuard);

  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should forbid to go to page when user is authenticated', () => {

    const getAuthenticatedUserTokenSpy = mockAuthService.getAuthenticatedUserToken.and.returnValue('test');

    expect(guard.canActivate()).toBeFalse();
    expect(getAuthenticatedUserTokenSpy).toHaveBeenCalled();

  });

  it('should allow to go to page when user is not authenticated', () => {

    const getAuthenticatedUserTokenSpy = mockAuthService.getAuthenticatedUserToken.and.returnValue(null);

    expect(guard.canActivate()).toBeTrue();
    expect(getAuthenticatedUserTokenSpy).toHaveBeenCalled();

  });

});
