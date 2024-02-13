import { ElementSearchResult } from "src/app/shared/models/element-search-result";
import { SearchApiActions, SearchPageActions } from "../actions";
import { SearchState, initialState } from "../search.state";
import { searchReducer } from "./search.reducers";
import { ApiError } from "src/app/shared/error/api-error";
import { BaseSearchRequest } from "src/app/shared/models/base-search-request";

describe('Testing search reducer', () => {

    it('should manage search element succeed action', () => {

        const searchResults: ElementSearchResult = {
            searchResults: ['Result 1', 'Result 2', 'Result 3', 'Result 4', 'Result 5'],
            currentIndex: 1,
            totalResults: 5,
            elementsPerPage: 3
        };

        const action = SearchApiActions.onSearchElementSuccess({ searchResults });

        const previousState: SearchState = initialState;

        const newState = searchReducer(previousState, action);

        expect(newState.searchResults).toEqual(searchResults);
        expect(newState.currentIndex).toEqual(searchResults.currentIndex);
        expect(newState.elementPerPage).toEqual(searchResults.elementsPerPage);
        expect(newState.error).toBeNull();
        expect(newState.isLoading).toBeFalse();

    });

    it('should manage search element failed action', () => {

        const error: ApiError = {
            message: 'message',
            errorList: []
        };

        const action = SearchApiActions.onSearchElementFailure({ error });

        const previousState: SearchState = initialState;

        const newState = searchReducer(previousState, action);

        expect(newState.searchResults).toBeNull();
        expect(newState.error).toEqual(error);
        expect(newState.isLoading).toBeFalse();

    });

    it('should manage search element with filter succeed action', () => {

        const searchResults: ElementSearchResult = {
            searchResults: ['Result 1', 'Result 2', 'Result 3', 'Result 4', 'Result 5'],
            currentIndex: 1,
            totalResults: 5,
            elementsPerPage: 3
        }

        const action = SearchApiActions.onSearchElementWithFilterSuccess({ searchResults });

        const previousState: SearchState = initialState;

        const newState = searchReducer(previousState, action);

        expect(newState.searchResults).toEqual(searchResults);
        expect(newState.error).toBeNull();
        expect(newState.isLoading).toBeFalse();

    });

    it('should manage search element with filter failed action', () => {

        const error: ApiError = {
            message: 'message',
            errorList: []
        };

        const action = SearchApiActions.onSearchElementWithFilterFailure({ error });

        const previousState: SearchState = initialState;

        const newState = searchReducer(previousState, action);

        expect(newState.searchResults).toBeNull();
        expect(newState.error).toEqual(error);
        expect(newState.isLoading).toBeFalse();

    });

    it('should manage change page action', () => {

        const nextIndex = 50;
        const nextPage = 2;

        const action = SearchPageActions.onChangePage({ nextIndex, nextPage });

        const previousState: SearchState = initialState;

        const newState = searchReducer(previousState, action);

        expect(newState.currentIndex).toEqual(nextIndex);
        expect(newState.currentPage).toEqual(nextPage);

    });

    it('should manage change search element type action', () => {

        const elementType = 1;

        const action = SearchPageActions.onChangeSearchElementType({ elementType });

        const previousState: SearchState = initialState;

        const newState = searchReducer(previousState, action);

        expect(newState.searchElementType).toEqual(elementType);

    });

    it('should manage set filter form action', () => {

        const filterForm: BaseSearchRequest = {
            form: 'form'
        };

        const action = SearchPageActions.onSetFilterForm({ filterForm });

        const previousState: SearchState = initialState;

        const newState = searchReducer(previousState, action);

        expect(newState.appliedFilter).toEqual(filterForm);
    });

    it('should manage set query action', () => {

        const query = 'query'

        const action = SearchPageActions.onSetQuery({ query });

        const previousState: SearchState = initialState;

        const newState = searchReducer(previousState, action);

        expect(newState.searchedQuery).toEqual(query);

    });

    it('should manage set is search result displayed action', () => {

        const action = SearchPageActions.onSetIsSearchResultsDisplayed({ isSearchResultsDisplayed: true });

        const previousState: SearchState = initialState;

        const newState = searchReducer(previousState, action);

        expect(newState.isSearchResultsDisplayed).toBeTrue();

    });

    it('should manage clear filter action', () => {

        const action = SearchPageActions.onClearFilter();

        let previousState: SearchState = {
            ...initialState, appliedFilter: {
                filter: "filter"
            }
        };

        const newState = searchReducer(previousState, action);

        expect(newState.appliedFilter).toBeNull();


    });

    it('should manage clear error action', () => {

        const action = SearchPageActions.onClearError();

        let previousState: SearchState = {
            ...initialState, error: {
                message: 'message',
                errorList: []
            }
        };

        const newState = searchReducer(previousState, action);

        expect(newState.error).toBeNull();


    });

    it('should manage clear query action', () => {

        const action = SearchPageActions.onClearQuery();

        let previousState: SearchState = { ...initialState, searchedQuery: 'Query' };

        const newState = searchReducer(previousState, action);

        expect(newState.searchedQuery).toEqual('');


    });

    it('should manage clear search result action', () => {

        const action = SearchPageActions.onClearSearchResults();

        const previousState: SearchState = {
            ...initialState, searchResults: {
                searchResults: ['Result 1', 'Result 2', 'Result 3', 'Result 4', 'Result 5'],
                currentIndex: 1,
                totalResults: 5,
                elementsPerPage: 3
            }
        };

        const newState = searchReducer(previousState, action);

        expect(newState.searchResults).toBeNull();

    });

    it('should manage toggle loading action', () => {

        const action = SearchPageActions.onToggleLoading();

        const previousState: SearchState = initialState;

        const newState = searchReducer(previousState, action);

        expect(newState.isLoading).toBeTrue();

    });

    it('should manage clear pagination action', () => {

        const action = SearchPageActions.onResetPagination();

        const resetState: SearchState = {...initialState, currentIndex: 30, currentPage: 2};

        const previousState: SearchState = initialState;

        const newState = searchReducer(resetState, action);

        expect(newState.currentIndex).toEqual(previousState.currentIndex);
        expect(newState.currentPage).toEqual(previousState.currentPage);

    });


});