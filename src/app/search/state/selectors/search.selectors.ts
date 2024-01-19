import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SearchState } from "../search.state";
import { ElementSearchResult } from "src/app/shared/models/element-search-result";

export const getSearchFeatureState = createFeatureSelector<SearchState<ElementSearchResult>>("search");

export const getSearchResults = createSelector(
    getSearchFeatureState,
    state => state.searchResults
);

export const getSearchedQuery = createSelector(
    getSearchFeatureState,
    state => state.searchedQuery
);

export const getCurrentPage = createSelector(
    getSearchFeatureState,
    state => state.currentPage
);

export const getCurrentIndex = createSelector(
    getSearchFeatureState,
    state => state.currentIndex
);

export const getError = createSelector(
    getSearchFeatureState,
    state => state.error
);

export const getFilterForm = createSelector(
    getSearchFeatureState,
    state => state.appliedFilter
);

export const getIsLoading = createSelector(
    getSearchFeatureState,
    state => state.isLoading
);