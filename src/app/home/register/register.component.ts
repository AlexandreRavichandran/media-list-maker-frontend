import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiError } from 'src/app/shared/error/api-error';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { MusicService } from 'src/app/shared/services/music/music.service';
import { AppUserState } from '../state/app-user.state';
import { getError, getIsLoading } from '../state/selectors/app-user.selectors';
import { AppUserPageActions } from '../state/actions';
import { AppUser } from 'src/app/shared/models/appuser/appuser';

@Component({
  selector: 'mlm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(
    private appUserStore: Store<AppUserState>,
    private authService: AuthService,
    private musicService: MusicService
  ) { }

  registerForm: FormGroup = this.authService.generateRegisterForm();
  randomMusicPictureUrl$: Observable<string> = this.musicService.getRandomIllustrationPictureUrl();
  apiError: Observable<ApiError | null> = this.appUserStore.select(getError);
  isLoading: Observable<boolean> = this.appUserStore.select(getIsLoading);

  isFormValid(): boolean {
    return this.registerForm.valid;
  }

  attemptRegistration(): void {

    if (this.isFormValid() === false) {
      return;
    }

    const appUser: AppUser = {
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
    }

    this.appUserStore.dispatch(AppUserPageActions.toggleLoading());
    this.appUserStore.dispatch(AppUserPageActions.register({ appUser }));
  }
}
