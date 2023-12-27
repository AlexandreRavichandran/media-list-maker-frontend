import { ArtistDetails } from "../artist/artist-details";

export interface AlbumSearchItem {

    apiCode: string;
    title: string;
    pictureUrl: string;
    artist: ArtistDetails;

}