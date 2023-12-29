import { Observable } from "rxjs";
import { ElementSearchResult } from "../models/element-search-result";

export interface SearchService {

    browseByQuery(query: string): Observable<ElementSearchResult>;

}