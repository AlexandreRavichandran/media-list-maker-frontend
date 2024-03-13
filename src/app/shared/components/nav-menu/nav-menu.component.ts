import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mlm-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  public onLogout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }

  public isUserLogged(): boolean {
    return this.authService.isUserLogged();
  }

}
