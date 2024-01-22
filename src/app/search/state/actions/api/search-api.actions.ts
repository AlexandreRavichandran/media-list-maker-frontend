import { createAction, props } from "@ngrx/store";
import { ApiError } from "src/app/shared/error/api-error";
import { ElementSearchResult } from "src/app/shared/models/element-search-result";

export const onSearchElementSuccess = createAction(
    "[Search/API] On search elements succeed",
    props<{ searchResults: ElementSearchResult }>()
);

export const onSearchElementFailure = createAction(
    "[Search/API] On search elements failed",
    props<{ error: ApiError }>()
);

export const onSearchElementWithFilterSuccess = createAction(
    "[Search/API] On search elements with filter succeed",
    props<{ searchResults: ElementSearchResult }>()
);

export const onSearchElementWithFilterFailure = createAction(
    "[Search/API] On search elements with filter failed",
    props<{ error: ApiError }>()
);
