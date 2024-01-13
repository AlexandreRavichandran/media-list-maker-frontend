import { AuthRequest } from "src/app/shared/models/auth/auth-request";
import { AppUserPageActions } from "..";
import { AppUser } from "src/app/shared/models/appuser/appuser";

describe("Testing App user page actions", () => {

    it("should create login action", () => {

        const authRequest: AuthRequest = {
            username: "username",
            password: "password"
        };

        const action = AppUserPageActions.login({ credentials: authRequest });

        expect(action.type).toEqual("[Auth] Login");
        expect(action.credentials).toEqual(authRequest);

    });

    it("should create logout action", () => {

        const action = AppUserPageActions.logout();

        expect(action.type).toEqual("[Auth] Logout");

    });

    it("should create register action", () => {

        const appUser: AppUser = {
            username: "username",
            password: "password"
        };

        const action = AppUserPageActions.register({ appUser });

        expect(action.type).toEqual("[Auth] Register");
        expect(action.appUser).toEqual(appUser);

    });

    it("should create toggle loading action", () => {

        const action = AppUserPageActions.toggleLoading();

        expect(action.type).toEqual("[Auth] Toggle loading");

    });

    it("should create clear error action", () => {

        const action = AppUserPageActions.clearError();

        expect(action.type).toEqual("[Auth] Clear error");

    });

});