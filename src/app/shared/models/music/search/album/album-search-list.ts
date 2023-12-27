import { ElementSearchResult } from "../../../element-search-result";
import { AlbumSearchItem } from "./album-search-item";

export interface AlbumSearchList extends ElementSearchResult {

    searchResults: AlbumSearchItem[];
    totalResults: number;
}