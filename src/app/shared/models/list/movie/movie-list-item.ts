import { Movie } from "../../movie/movie";

export interface MovieListItem {

    id: number;
    movieId: number;
    appUserId: number;
    sortingOrder: number;
    addedAt: Date;
    movieDetail: Movie | undefined;
}