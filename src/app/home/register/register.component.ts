import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiError } from 'src/app/shared/error/api-error';
import { AuthResponse } from 'src/app/shared/models/auth/auth-response';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { MusicService } from 'src/app/shared/services/music/music.service';

@Component({
  selector: 'mlm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    trigger('flash', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('1s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class RegisterComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private musicService: MusicService
  ) { }

  registerForm: FormGroup = this.authService.generateRegisterForm();
  randomMusicPictureUrl$: Observable<string> = this.musicService.getRandomIllustrationPictureUrl();
  apiError: ApiError | null = null;
  isLoading: boolean = false;

  isFormValid(): boolean {
    return this.registerForm.valid;
  }

  attemptRegistration(): void {

    if (this.isFormValid() === false) {
      return;
    }

    this.isLoading = true;

    this.authService.register(this.registerForm.value).subscribe({
      next: (token: AuthResponse) => {
        this.handleAuthSuccessful(token);
      },
      error: (error: ApiError) => {
        this.handleAuthFailure(error);
      }
    });
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
