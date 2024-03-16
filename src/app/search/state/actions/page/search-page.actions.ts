import { createAction, props } from "@ngrx/store";
import { BaseSearchRequest } from "src/app/shared/models/base-search-request";

export const onSearchElement = createAction(
    "[Search] Search element",
    props<{ query: string, elementType: number, index: number }>()
);

export const onSearchElementWithFilter = createAction(
    "[Search] Search element with filter",
    props<{ query: string, elementType: number, index: number, filter: BaseSearchRequest }>()
);

export const onChangePage = createAction(
    "[Search] Change page",
    props<{ nextIndex: number, nextPage: number }>()
);

export const onSetFilterForm = createAction(
    "[Search] Set filter form",
    props<{ filterForm: BaseSearchRequest }>()
);

export const onClearQuery = createAction(
    "[Search] Clear query"
);

export const onClearSearchResults = createAction(
    "[Search] Clear search results"
)

export const onChangeSearchElementType = createAction(
    "[Search] Change search element type",
    props<{ elementType: number }>()
);

export const onSetQuery = createAction(
    "[Search] Set search query",
    props<{ query: string }>()
);

export const onClearFilter = createAction(
    "[Search] Clear filter"
);

export const onResetPagination = createAction(
    "[Search] Reset pagination"
);

export const onClearError = createAction(
    "[Search] Clear error"
);

export const onToggleLoading = createAction(
    "[Search] Toggle loading"
);

export const onSetIsSearchResultsDisplayed = createAction(
    "[Search] Display search results",
    props<{ isSearchResultsDisplayed: boolean }>()
);

export const onClearState = createAction(
    "[Search] Reset state"
);