import { createReducer, on } from "@ngrx/store";
import { SearchState, initialState } from "../search.state";
import { SearchApiActions, SearchPageActions } from "../actions";
import { ElementSearchResult } from "src/app/shared/models/element-search-result";
import { act } from "@ngrx/effects";

export const searchReducer = createReducer(
    initialState,
    on(SearchApiActions.onSearchElementSuccess, (state, actions): SearchState => {

        return {
            ...state,
            searchResults: actions.searchResults,
            currentIndex: actions.searchResults.currentIndex,
            elementPerPage: actions.searchResults.elementsPerPage,
            error: null,
            isLoading: false
        }

    }),
    on(SearchApiActions.onSearchElementFailure, (state, actions): SearchState => {

        return {
            ...state,
            searchResults: null,
            error: actions.error,
            isLoading: false
        }

    }),
    on(SearchApiActions.onSearchElementWithFilterSuccess, (state, actions): SearchState => {

        return {
            ...state,
            searchResults: actions.searchResults,
            error: null,
            isLoading: false
        }

    }),
    on(SearchApiActions.onSearchElementWithFilterFailure, (state, actions): SearchState => {

        return {
            ...state,
            searchResults: null,
            error: actions.error,
            isLoading: false
        }

    }),
    on(SearchApiActions.onChangePageSuccess, (state, actions): SearchState => {

        return {
            ...state,
            searchResults: actions.searchResults,
            error: null,
            isLoading: false
        }

    }),
    on(SearchApiActions.onChangePageFailure, (state, actions): SearchState => {

        return {
            ...state,
            searchResults: null,
            error: actions.error,
            isLoading: false
        }

    }),
    on(SearchPageActions.onChangeSearchElementType, (state, actions): SearchState => {

        return {
            ...state,
            searchElementType: actions.elementType
        }

    }),
    on(SearchPageActions.onSetFilterForm, (state, actions): SearchState => {

        return {
            ...state,
            appliedFilter: actions.filterForm
        }

    }),
    on(SearchPageActions.onClearFilter, (state, actions): SearchState => {

        return {
            ...state,
            appliedFilter: null
        }

    }),
    on(SearchPageActions.onClearError, (state, actions): SearchState => {

        return {
            ...state,
            error: null
        }

    }),
    on(SearchPageActions.onSetQuery, (state, actions): SearchState => {

        return {
            ...state,
            searchedQuery: actions.query
        }

    }),
    on(SearchPageActions.onClearQuery, (state, actions): SearchState => {

        return {
            ...state,
            searchedQuery: "null"
        }

    }),
    on(SearchPageActions.onClearSearchResults, (state): SearchState => {

        return {
            ...state,
            searchResults: null
        }

    }),
    on(SearchPageActions.onToggleLoading, (state, actions): SearchState => {

        return {
            ...state,
            isLoading: !state.isLoading
        }

    }),

)