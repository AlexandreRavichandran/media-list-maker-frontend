import { FormGroup } from "@angular/forms";
import { createAction, props } from "@ngrx/store";

export const onSearchElement = createAction(
    "[Search] Search element",
    props<{ query: string }>()
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

export const changeSearchElementType = createAction(
    "[Search] Change search element type",
    props<{ elementType: number }>()
);

export const clearFilter = createAction(
    "[Search] Clear filter"
);

export const onClearError = createAction(
    "[Search] Clear error"
);