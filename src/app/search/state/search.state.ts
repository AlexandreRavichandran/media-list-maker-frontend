import { FormGroup } from "@angular/forms";
import { ApiError } from "src/app/shared/error/api-error";
import { ElementSearchResult } from "src/app/shared/models/element-search-result";

export interface SearchState {

    searchResults: ElementSearchResult | null;
    searchedQuery: string;
    currentPage: number;
    elementPerPage: number;
    currentIndex: number;
    appliedFilter: FormGroup | null;
    searchElementType: number;
    error: ApiError | null;
    isLoading: boolean;

}

export const initialState: SearchState = {

    searchResults: null,
    searchedQuery: "",
    currentPage: 1,
    elementPerPage: 1,
    currentIndex: 0,
    appliedFilter: null,
    searchElementType: 0,
    error: null,
    isLoading: false

}