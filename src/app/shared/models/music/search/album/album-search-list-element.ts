import { ArtistDetails } from "../artist/artist-details";

export interface AlbumSearchListElement {

    id: string;
    title: string;
    pictureUrl: string;
    artist: ArtistDetails;
    
}