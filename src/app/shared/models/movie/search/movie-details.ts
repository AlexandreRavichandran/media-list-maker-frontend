import { Rating } from "./rating";

export interface MovieDetails {

    apiCode: string;
    title: string;
    releasedAt: number;
    duration: string;
    genreList: string[];
    mainActors: string;
    synopsis: string;
    director: string;
    pictureUrl: string;
    ratings: Rating[];
    isAlreadyInList: boolean;

}