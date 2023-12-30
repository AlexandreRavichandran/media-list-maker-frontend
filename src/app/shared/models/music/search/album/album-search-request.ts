import { BaseSearchRequest } from "../../../base-search-request";

export interface AlbumSearchRequest extends BaseSearchRequest {

    artist: string | undefined;
    label: string | undefined;

}