import { AuthResponse } from "src/app/shared/models/auth/auth-response";
import { AppUserApiActions, AppUserPageActions } from "../actions";
import { AppUserState } from "../app-user.state";
import { initialState } from "../app-user.state";
import { appUserReducer } from "./app-user.reducers";
import { ApiError } from "src/app/shared/error/api-error";

describe("Testing App user reducer", () => {

    it("should manage login succeed action", () => {

        const authResponse: AuthResponse = {
            token: "token",
            username: "username",
            expiresAt: new Date()
        };

        const action = AppUserApiActions.onLoginSuccess({ token: authResponse });

        const previousState: AppUserState = initialState;

        const newState = appUserReducer(previousState, action);

        expect(newState.isLoading).toBeFalse();
        expect(newState.error).toBeNull();
        expect(newState.token).toEqual(authResponse);

    });

    it("should manage login failed action", () => {

        const error: ApiError = {
            message: "Error",
            errorList: []
        };

        const action = AppUserApiActions.onLoginFailure({ error });

        const previousState: AppUserState = initialState;

        const newState = appUserReducer(previousState, action);

        expect(newState.isLoading).toBeFalse();
        expect(newState.error).toEqual(error);
        expect(newState.token).toBeNull();

    });

    it("should manage registration succeed action", () => {

        const authResponse: AuthResponse = {
            token: "token",
            username: "username",
            expiresAt: new Date()
        };

        const action = AppUserApiActions.onRegisterSuccess({ token: authResponse });

        const previousState: AppUserState = initialState;

        const newState = appUserReducer(previousState, action);

        expect(newState.isLoading).toBeFalse();
        expect(newState.error).toBeNull();
        expect(newState.token).toEqual(authResponse);

    });

    it("should manage registration failed action", () => {

        const error: ApiError = {
            message: "Error",
            errorList: []
        };

        const action = AppUserApiActions.onRegisterFailure({ error });

        const previousState: AppUserState = initialState;

        const newState = appUserReducer(previousState, action);

        expect(newState.isLoading).toBeFalse();
        expect(newState.error).toEqual(error);
        expect(newState.token).toBeNull();

    });

    it("should manage logout action", () => {

        const action = AppUserPageActions.logout();

        const previousState: AppUserState = initialState;

        const newState = appUserReducer(previousState, action);

        expect(newState.isLoading).toBeFalse();
        expect(newState.error).toBeNull();
        expect(newState.token).toBeNull();

    });

    it("should manage toggle loading action", () => {

        const action = AppUserPageActions.toggleLoading();

        const previousState: AppUserState = initialState;

        const newState = appUserReducer(previousState, action);

        expect(newState.isLoading).toBeTrue();
        expect(newState.error).toBeNull();
        expect(newState.token).toBeNull();

    });

    it("should manage clear error action", () => {

        const error: ApiError = {
            message: "Error",
            errorList: []
        };

        const action = AppUserPageActions.clearError();

        const previousState: AppUserState = { ...initialState, error };

        const newState = appUserReducer(previousState, action);

        expect(newState.isLoading).toBeFalse();
        expect(newState.error).toBeNull();
        expect(newState.token).toBeNull();

    });

});