import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SearchState } from "../search.state";

export const getSearchFeatureState = createFeatureSelector<SearchState>("search");

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

export const getIsSearchResultsDisplayed = createSelector(
    getSearchFeatureState,
    state => state.isSearchResultsDisplayed
);

export const getSearchElementType = createSelector(
    getSearchFeatureState,
    state => state.searchElementType
);

export const getSearchElementDatas = createSelector(
    getSearchFeatureState,
    state => ({
        currentIndex: state.currentIndex,
        query: state.searchedQuery,
        filter: state.appliedFilter,
        searchElementType: state.searchElementType
    })
);