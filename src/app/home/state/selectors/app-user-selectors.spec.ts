import { ApiError } from "src/app/shared/error/api-error";
import { AppUserState } from "../app-user.state";
import { getError, getIsLoading, getToken } from "./app-user.selectors";
import { AuthResponse } from "src/app/shared/models/auth/auth-response";

describe("Testing App user selector", () => {

    it("should return loading", () => {

        const initialState: AppUserState = {
            token: null,
            error: null,
            isLoading: true
        };

        const result = getIsLoading.projector(initialState);
        expect(result).toBeTrue();

    })

    it("should return error", () => {

        const apiError: ApiError = {
            message: 'Api error',
            errorList: []
        };

        const initialState: AppUserState = {
            token: null,
            error: apiError,
            isLoading: true
        };

        const result = getError.projector(initialState);
        expect(result).toEqual(apiError);

    });

    it("should return token", () => {

        const authResponse: AuthResponse = {
            token: 'token',
            username: 'username',
            expiresAt: new Date()
        };

        const initialState: AppUserState = {
            token: authResponse,
            error: null,
            isLoading: true
        };

        const result = getToken.projector(initialState);
        expect(result).toEqual(authResponse);

    });

});