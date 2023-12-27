import { ElementSearchResult } from "../../element-search-result";
import { MovieSearchItem } from "./movie-search-item";

export interface MovieSearchList extends ElementSearchResult {

    totalResults: number;
    searchResults: MovieSearchItem[];

}