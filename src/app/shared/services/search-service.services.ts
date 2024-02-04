import { Observable } from "rxjs";
import { ElementSearchResult } from "../models/element-search-result";
import { BaseSearchRequest } from "../models/base-search-request";

export interface SearchService {

    browseByQueryAndIndex(query: string, index: number): Observable<ElementSearchResult>;

    browseByQueryAndFilter(query: string, index: number, filters: BaseSearchRequest): Observable<ElementSearchResult>;
}