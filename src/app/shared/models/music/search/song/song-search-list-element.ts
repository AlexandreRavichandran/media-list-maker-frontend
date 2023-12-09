import { ArtistDetails } from "../artist/artist-details";

export interface SongSearchListElement {

    id: string;
    title: string;
    duration: string;
    preview: string;
    artist: ArtistDetails;

}