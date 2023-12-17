import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiError } from 'src/app/shared/error/api-error';
import { AuthResponse } from 'src/app/shared/models/auth/auth-response';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) { }

  loginForm: FormGroup = this.authService.generateLoginForm();
  apiError: ApiError | null = null;
  isLoading: boolean = false;

  attemptAuth(): void {

    if (this.isFormValid() === false) {
      return;
    }

    this.isLoading = true;

    this.authService.login(this.loginForm.value).subscribe({

      next: (token: AuthResponse) => {
        sessionStorage.setItem('token', token.token);
        this.isLoading = false;
        this.router.navigate(['me']);
      },
      error: (error: ApiError) => {
        this.apiError = error;
        sessionStorage.removeItem('token');
        this.isLoading = false;
      }

    });

  }

  isFormValid(): boolean {
    return this.loginForm.valid;
  }
}
