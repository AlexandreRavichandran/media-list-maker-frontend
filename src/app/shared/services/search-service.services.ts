import { Observable } from "rxjs";
import { ElementSearchResult } from "../models/element-search-result";
import { BaseSearchRequest } from "../models/base-search-request";

export interface SearchService {

    browseByQuery(query: string): Observable<ElementSearchResult>;

    browseByQueryAndFilter(filters: BaseSearchRequest): Observable<ElementSearchResult>;
}