import { createReducer, on } from "@ngrx/store";
import { AppUserState, initialState } from "../app-user.state";
import { AppUserApiActions, AppUserPageActions } from "../actions";

export const appUserReducer = createReducer(
    initialState,
    on(AppUserApiActions.onLoginSuccess, (state, action): AppUserState => {

        return {
            ...state,
            token: action.token,
            isLoading: false,
            error: null
        }

    }),

    on(AppUserApiActions.onLoginFailure, (state, action): AppUserState => {

        return {
            ...state,
            token: null,
            isLoading: false,
            error: action.error
        }

    }),

    on(AppUserApiActions.onRegisterSuccess, (state, action): AppUserState => {

        return {
            ...state,
            token: action.token,
            isLoading: false,
            error: null
        }

    }),

    on(AppUserApiActions.onRegisterFailure, (state, action): AppUserState => {

        return {
            ...state,
            token: null,
            isLoading: false,
            error: action.error
        }

    }),

    on(AppUserPageActions.logout, (state): AppUserState => {

        return {
            ...state,
            token: null,
            isLoading: false,
            error: null
        }

    }),

    on(AppUserPageActions.toggleLoading, (state): AppUserState => {

        return {
            ...state,
            isLoading: !state.isLoading
        }

    }),

    on(AppUserPageActions.clearError, (state): AppUserState => {

        return {
            ...state,
            error: null
        }

    })

)