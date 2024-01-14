import { AuthResponse } from "src/app/shared/models/auth/auth-response";
import { AppUserApiActions } from "..";
import { ApiError } from "src/app/shared/error/api-error";

describe("Testing App user api actions", () => {

    it("should create login success action", () => {

        const authResponse: AuthResponse = {
            token: "token",
            username: "username",
            expiresAt: new Date()
        };

        const action = AppUserApiActions.onLoginSuccess({ token: authResponse });

        expect(action.type).toEqual("[Auth/API] Login succeed");
        expect(action.token).toEqual(authResponse);

    });

    it("should create login failure action", () => {

        const apiError: ApiError = {
            message: "Error",
            errorList: []
        };

        const action = AppUserApiActions.onLoginFailure({ error: apiError });

        expect(action.type).toEqual("[Auth/API] Login failed");
        expect(action.error).toEqual(apiError);

    });

    it("should create register success action", () => {

        const authResponse: AuthResponse = {
            token: "token",
            username: "username",
            expiresAt: new Date()
        };

        const action = AppUserApiActions.onRegisterSuccess({ token: authResponse });

        expect(action.type).toEqual("[Auth/API] Registration succeed");
        expect(action.token).toEqual(authResponse);

    });

    it("should create register success action", () => {

        const apiError: ApiError = {
            message: "Error",
            errorList: []
        };

        const action = AppUserApiActions.onRegisterFailure({ error: apiError });

        expect(action.type).toEqual("[Auth/API] Registration failed");
        expect(action.error).toEqual(apiError);


    });

});