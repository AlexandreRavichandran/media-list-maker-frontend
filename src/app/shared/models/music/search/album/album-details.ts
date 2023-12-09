import { ArtistDetails } from "../artist/artist-details";
import { Genre } from "./genre";

export interface AlbumDetails {

    apiCode: string
    title: string;
    pictureUrl: string;
    releaseDate: string;
    artist: ArtistDetails;
    genreList: Genre[];
    isAlreadyInList: boolean;

}