import { FormGroup } from "@angular/forms";
import { createAction, props } from "@ngrx/store";

export const onSearchElement = createAction(
    "[Search] Search element",
    props<{ query: string, elementType: number }>()
);

export const onSearchElementWithFilter = createAction(
    "[Search] Search element",
    props<{ query: string, filter: FormGroup }>()
);

export const onChangePage = createAction(
    "[Search] Change page",
    props<{ nextPage: number, nextIndex: number }>()
);

export const onSetFilterForm = createAction(
    "[Search] Set filter form",
    props<{ filterForm: FormGroup }>()
);

export const onClearQuery = createAction(
    "[Search] Clear query"
);

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

export const onClearError = createAction(
    "[Search] Clear error"
);

export const onToggleLoading = createAction(
    "[Search] Toggle loading"
);