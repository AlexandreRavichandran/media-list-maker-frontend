import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationNeededGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canLoad(): boolean {

    if (this.isUserAuthenticated()) {
      return true;
    }

    this.router.navigate(['/login']);

    return false;

  }

  private isUserAuthenticated(): boolean {

    if (this.authService.getAuthenticatedUserToken()) {
      return true;
    }

    return false;

  }

}
