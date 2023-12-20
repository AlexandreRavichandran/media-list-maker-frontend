import { TestBed } from '@angular/core/testing';

import { AuthCanLoadGuard } from './auth.can-load.guard';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('Testing auth can load guard', () => {

  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  let guard: AuthCanLoadGuard;

  beforeEach(() => {

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['getAuthenticatedUserToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{ provide: Router, useValue: mockRouter }, { provide: AuthService, useValue: mockAuthService }]
    });

    guard = TestBed.inject(AuthCanLoadGuard);

  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow to go to page if token exist', () => {

    const getAuthenticatedUserTokenSpy = mockAuthService.getAuthenticatedUserToken.and.returnValue('test');

    expect(guard.canLoad()).toBeTrue();
    expect(getAuthenticatedUserTokenSpy).toHaveBeenCalled();

  });

  it('should forbid to go to page if token not exists', () => {

    const getAuthenticatedUserTokenSpy = mockAuthService.getAuthenticatedUserToken.and.returnValue(null);
    const navigateSpy = mockAuthService.getAuthenticatedUserToken;

    expect(guard.canLoad()).toBeFalse();
    expect(getAuthenticatedUserTokenSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith();

  });

});
