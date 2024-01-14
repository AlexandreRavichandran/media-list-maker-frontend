import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppUserState } from "../app-user.state";
import { Features } from "src/app/shared/constants/features.enum";

const getAppUserFeatureState = createFeatureSelector<AppUserState>(Features.AppUser);

export const getIsLoading = createSelector(
    getAppUserFeatureState,
    state => state.isLoading
);

export const getError = createSelector(
    getAppUserFeatureState,
    state => state.error
);

export const getToken = createSelector(
    getAppUserFeatureState,
    state => state.token
);

