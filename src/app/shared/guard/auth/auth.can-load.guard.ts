import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthCanLoadGuard implements CanLoad {

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
