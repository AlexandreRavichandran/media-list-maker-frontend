import { ArtistDetails } from "../artist/artist-details";

export interface SongDetails {

    title: string;
    apiCode: string;
    duration: number;
    rank: number;
    trackNumber: number;
    preview: string;
    artist: ArtistDetails;

}