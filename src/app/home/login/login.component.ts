import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiError } from 'src/app/shared/error/api-error';
import { AuthResponse } from 'src/app/shared/models/auth/auth-response';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { MovieService } from 'src/app/shared/services/movie/movie.service';

@Component({
  selector: 'mlm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup = this.authService.generateLoginForm();
  randomMoviePictureUrl$: Observable<string> = this.movieService.getRandomIllustrationPictureUrl();
  apiError: ApiError | null = null;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private movieService: MovieService
  ) { }

  attemptAuth(): void {

    if (this.isFormValid() === false) {
      return;
    }

    this.isLoading = true;

    this.authService.login(this.loginForm.value).subscribe({

      next: (token: AuthResponse) => {
        this.handleAuthSuccessful(token);
      },
      error: (error: ApiError) => {
        this.handleAuthFailure(error);
      }

    });

  }

  isFormValid(): boolean {
    return this.loginForm.valid;
  }

  private handleAuthSuccessful(authResponse: AuthResponse): void {

    sessionStorage.setItem('token', authResponse.token);
    this.isLoading = false;
    this.router.navigate(['me']);

  }

  private handleAuthFailure(error: ApiError): void {

    this.apiError = error;
    sessionStorage.removeItem('token');
    this.isLoading = false;

  }
}
