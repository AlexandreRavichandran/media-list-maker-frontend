import { BaseSearchRequest } from "../../base-search-request";

export interface MovieSearchRequest extends BaseSearchRequest {

    year: string | null;

}