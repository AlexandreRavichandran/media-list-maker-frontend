import { SearchState } from "../search.state";
import { getCurrentIndex, getCurrentPage, getError, getFilterForm, getIsLoading, getIsSearchResultsDisplayed, getSearchElementDatas, getSearchElementType, getSearchResults, getSearchedQuery } from "./search.selectors";

describe('Testing search selector', () => {

    let searchState: SearchState;

    beforeEach(() => {

        searchState = {
            searchResults: {
                searchResults: [],
                currentIndex: 10,
                totalResults: 150,
                elementsPerPage: 10
            },
            searchedQuery: 'query',
            searchElementType: 1,
            isSearchResultsDisplayed: true,
            appliedFilter: 'form',
            elementPerPage: 10,
            isLoading: true,
            currentIndex: 10,
            currentPage: 2,
            error: {
                message: 'message',
                errorList: []
            }
        }

    });

    it('should return search result', () => {

        const result = getSearchResults.projector(searchState);
        expect(result).toEqual(searchState.searchResults);

    });

    it('should return searched query', () => {

        const result = getSearchedQuery.projector(searchState);
        expect(result).toEqual(searchState.searchedQuery);

    });

    it('should return current page', () => {

        const result = getCurrentPage.projector(searchState);
        expect(result).toEqual(searchState.currentPage);

    });

    it('should return current index', () => {

        const result = getCurrentIndex.projector(searchState);
        expect(result).toEqual(searchState.currentIndex);

    });

    it('should return error', () => {

        const result = getError.projector(searchState);
        expect(result).toEqual(searchState.error);

    });

    it('should return filter form', () => {

        const result = getFilterForm.projector(searchState);
        expect(result).toEqual(searchState.appliedFilter);

    });

    it('should return is loading', () => {

        const result = getIsLoading.projector(searchState);
        expect(result).toEqual(searchState.isLoading);

    });

    it('should return is search result displayed', () => {

        const result = getIsSearchResultsDisplayed.projector(searchState);
        expect(result).toEqual(searchState.isSearchResultsDisplayed);

    });

    it('should return search element type', () => {

        const result = getSearchElementType.projector(searchState);
        expect(result).toEqual(searchState.searchElementType);

    });

    it('should return search element datas', () => {

        const elementDatas = {
            currentIndex: searchState.currentIndex,
            query: searchState.searchedQuery,
            filter: searchState.appliedFilter,
            searchElementType: searchState.searchElementType
        };

        const result = getSearchElementDatas.projector(searchState);
        expect(result).toEqual(elementDatas);

    });

});