import { ElementSearchResult } from "src/app/shared/models/element-search-result";
import { SearchApiActions } from "..";
import { ApiError } from "src/app/shared/error/api-error";

fdescribe("Testing search api actions", () => {

    it("should create search element success action", () => {

        const searchResults: ElementSearchResult = {
            currentIndex: 1,
            elementsPerPage: 1,
            totalResults: 1,
            searchResults: []
        }

        const action = SearchApiActions.onSearchElementSuccess({ searchResults });

        expect(action.searchResults).toEqual(searchResults);

    });

    it("should create search element failure action", () => {

        const error: ApiError = {
            errorList: [],
            message: "Error"
        }

        const action = SearchApiActions.onSearchElementFailure({ error });

        expect(action.error).toEqual(error);

    });

    it("should create search elements with filter success action", () => {

        const searchResults: ElementSearchResult = {
            currentIndex: 1,
            elementsPerPage: 1,
            totalResults: 1,
            searchResults: []
        }

        const action = SearchApiActions.onSearchElementWithFilterSuccess({ searchResults });

        expect(action.searchResults).toEqual(searchResults);

    });

    it("should create search elements with filter failure action", () => {

        const error: ApiError = {
            errorList: [],
            message: "Error"
        }

        const action = SearchApiActions.onSearchElementWithFilterFailure({ error });

        expect(action.error).toEqual(error);

    });

});