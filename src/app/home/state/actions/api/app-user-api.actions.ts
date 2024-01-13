import { createAction, props } from "@ngrx/store";
import { ApiError } from "src/app/shared/error/api-error";
import { AuthResponse } from "src/app/shared/models/auth/auth-response";

export const onLoginSuccess = createAction(
    "[Auth/API] Login succeed",
    props<{ token: AuthResponse }>()
);

export const onLoginFailure = createAction(
    "[Auth/API] Login failed",
    props<{ error: ApiError }>()
);

export const onRegisterSuccess = createAction(
    "[Auth/API] Registration succeed",
    props<{ token: AuthResponse }>()
);

export const onRegisterFailure = createAction(
    "[Auth/API] Registration failed",
    props<{ error: ApiError }>()
);