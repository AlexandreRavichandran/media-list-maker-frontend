import { FormGroup } from "@angular/forms";
import { ElementSearchResult } from "src/app/shared/models/element-search-result";

export interface SearchState<T extends ElementSearchResult> {

    searchResults: T[];
    searchedQuery: string;
    currentPage: number;
    elementPerPage: number;
    currentIndex: number;
    appliedFilter: FormGroup | null;
    searchElementType: number;

}

export const initialState: SearchState<ElementSearchResult> = {

    searchResults: [],
    searchedQuery: "",
    currentPage: 1,
    elementPerPage: 1,
    currentIndex: 0,
    appliedFilter: null,
    searchElementType: 0

}