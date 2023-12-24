import { SongDetails } from "../song/song-details";

export interface TrackList {

    totalDurationInEpochMilli: number;
    albumPopularityRate: number;
    songList: SongDetails[];

}