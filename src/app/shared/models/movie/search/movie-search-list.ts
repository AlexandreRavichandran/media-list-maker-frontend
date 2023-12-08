import { MovieSearchItem } from "./movie-search-item";

export interface MovieSearchList {

    totalResults: number;
    responseStatus: number;
    movieElementList: MovieSearchItem[];

}