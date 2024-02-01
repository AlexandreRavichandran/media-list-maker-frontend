import { SearchPageActions } from "..";

describe("Testing search page actions", () => {

    it("should create search element action", () => {

        const action = SearchPageActions.onSearchElement({ query: "query", elementType: 1, index: 2 });

        expect(action.query).toEqual("query");
        expect(action.elementType).toEqual(1);
        expect(action.index).toEqual(2);

    });

    it("should create change page action", () => {

        const action = SearchPageActions.onChangePage({ nextIndex: 1, nextPage: 2 });

        expect(action.nextIndex).toEqual(1);
        expect(action.nextPage).toEqual(2);

    });

    it("should create set query action", () => {

        const action = SearchPageActions.onSetQuery({ query: "query" });

        expect(action.query).toEqual("query");

    });

    it("should create change search element type action", () => {

        const action = SearchPageActions.onChangeSearchElementType({elementType: 1});

        expect(action.elementType).toEqual(1);

    });

    it("should create set is search result displayed action", () => {

        const action = SearchPageActions.onSetIsSearchResultsDisplayed({isSearchResultsDisplayed: true});

        expect(action.isSearchResultsDisplayed).toBeTrue();

    });

});