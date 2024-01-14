import { createAction, props } from "@ngrx/store";
import { AppUser } from "src/app/shared/models/appuser/appuser";
import { AuthRequest } from "src/app/shared/models/auth/auth-request";

export const login = createAction(
    "[Auth] Login",
    props<{ credentials: AuthRequest }>()
);

export const logout = createAction(
    "[Auth] Logout"
);

export const register = createAction(
    "[Auth] Register",
    props<{ appUser: AppUser }>()
);

export const toggleLoading = createAction(
    "[Auth] Toggle loading"
);

export const clearError = createAction(
    "[Auth] Clear error"
);

