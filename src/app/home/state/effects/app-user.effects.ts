import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { AppUserApiActions, AppUserPageActions } from "../actions";
import { catchError, concatMap, map, of, tap } from "rxjs";

@Injectable()
export class AppUserEffects {

    constructor(private actions$: Actions, private authService: AuthService, private router: Router) { }

    $onLogin = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(AppUserPageActions.login),
                concatMap(action => this.authService.login(action.credentials)
                    .pipe(
                        map(token => AppUserApiActions.onLoginSuccess({ token })),
                        tap(token => {
                            if (token.token.token !== undefined) {
                                sessionStorage.setItem("token", token.token.token);
                            }
                        }),
                        tap(() => this.router.navigate(['/me'])),
                        catchError(error => of(AppUserApiActions.onLoginFailure({ error })))
                    ))
            );
    });

    $onRegister = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(AppUserPageActions.register),
                concatMap(action => this.authService.register(action.appUser)
                    .pipe(
                        map(token => AppUserApiActions.onRegisterSuccess({ token })),
                        tap(token => {
                            if (token.token.token !== undefined) {
                                sessionStorage.setItem("token", token.token.token);
                            }
                        }),
                        tap(() => this.router.navigate(['me'])),
                        catchError(error => of(AppUserApiActions.onRegisterFailure({ error })))
                    ))
            );
    });

}