import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiError } from 'src/app/shared/error/api-error';
import { AuthResponse } from 'src/app/shared/models/auth/auth-response';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { MovieService } from 'src/app/shared/services/movie/movie.service';
import { AppUserState } from '../state/app-user.state';
import { AppUserPageActions } from '../state/actions';
import { getError, getIsLoading } from '../state/selectors/app-user.selectors';

@Component({
  selector: 'mlm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup = this.authService.generateLoginForm();
  randomMoviePictureUrl$: Observable<string> = this.movieService.getRandomIllustrationPictureUrl();
  apiError: Observable<ApiError | null> = this.appUserStore.select(getError);
  isLoading: Observable<boolean> = this.appUserStore.select(getIsLoading);

  constructor(
    private appUserStore: Store<AppUserState>,
    private authService: AuthService,
    private movieService: MovieService
  ) { }

  attemptAuth(): void {

    if (this.isFormValid() === false) {
      return;
    }

    this.appUserStore.dispatch(AppUserPageActions.toggleLoading());
    this.appUserStore.dispatch(AppUserPageActions.login({ credentials: this.loginForm.value }));

  }

  isFormValid(): boolean {
    return this.loginForm.valid;
  }

}
