import { SongDetails } from "../song/song-details";

export interface TrackList {

    totalDuration: string;
    albumPopularityRate: number;
    songList: SongDetails[];

}