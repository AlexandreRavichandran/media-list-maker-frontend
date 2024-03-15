import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationTypeConstant } from 'src/app/shared/constants/notification-type.constant';
import { ApiError } from 'src/app/shared/error/api-error';
import { AuthResponse } from 'src/app/shared/models/auth/auth-response';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { MovieService } from 'src/app/shared/services/movie/movie.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

@Component({
  selector: 'mlm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('flash', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('1s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class LoginComponent {

  loginForm: FormGroup = this.authService.generateLoginForm();
  randomMoviePictureUrl$: Observable<string> = this.movieService.getRandomIllustrationPictureUrl();
  apiError: ApiError | null = null;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private movieService: MovieService,
    private notificationService: NotificationService
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
      error: (error) => {
        this.handleAuthFailure(error);
      }

    });

  }

  isFormValid(): boolean {
    return this.loginForm.valid;
  }

  private handleAuthSuccessful(authResponse: AuthResponse): void {

    sessionStorage.setItem('token', authResponse.token);
    sessionStorage.setItem('username', authResponse.username);
    this.isLoading = false;
    this.notificationService.addNewNotification(`Welcome back ${authResponse.username}`, NotificationTypeConstant.SUCCESS.type);
    this.router.navigate(['me']);

  }

  private handleAuthFailure(error: ApiError): void {

    sessionStorage.removeItem('token');
    this.isLoading = false;
    this.notificationService.addNewNotification(error.message, NotificationTypeConstant.ERROR.type);

  }

}
