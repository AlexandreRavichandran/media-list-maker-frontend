import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthNeededGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(): boolean {
    console.log("okokoko");
    if (this.isUserAuthenticated()) {
      this.router.navigate(['/me']);
      return false;
    }

    return true;

  }

  private isUserAuthenticated(): boolean {

    if (this.authService.getAuthenticatedUserToken()) {
      return true;
    }

    return false;

  }

}
