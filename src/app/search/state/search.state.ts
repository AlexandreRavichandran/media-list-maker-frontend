import { FormGroup } from "@angular/forms";
import { ApiError } from "src/app/shared/error/api-error";
import { BaseSearchRequest } from "src/app/shared/models/base-search-request";
import { ElementSearchResult } from "src/app/shared/models/element-search-result";

export interface SearchState {

    searchResults: ElementSearchResult | null;
    searchedQuery: string;
    currentPage: number;
    elementPerPage: number;
    currentIndex: number;
    appliedFilter: BaseSearchRequest | null;
    searchElementType: number;
    error: ApiError | null;
    isLoading: boolean;
    isSearchResultsDisplayed: boolean;

}

export const initialState: SearchState = {

    searchResults: null,
    searchedQuery: "",
    currentPage: 1,
    elementPerPage: 1,
    currentIndex: 0,
    appliedFilter: null,
    searchElementType: 1,
    error: null,
    isLoading: false,
    isSearchResultsDisplayed: false

}