import { Movie } from "../../movie/movie";

export interface MovieListItem {

    id: number;
    movieId: number;
    appUserId: number;
    sortingNumber: number;
    addedAt: Date;
    movieDetail: Movie | undefined;
}