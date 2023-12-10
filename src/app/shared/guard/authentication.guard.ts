import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivateChild, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canActivateChild(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.isUserAuthenticated();

  }

  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.isUserAuthenticated();

  }

  private isUserAuthenticated(): boolean {

    if (this.authService.getAuthenticatedUserToken()) {
      return true;
    }
    this.router.navigate(['/auth']);

    return false;

  }
  
}
