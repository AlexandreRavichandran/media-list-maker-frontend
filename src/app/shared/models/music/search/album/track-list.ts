import { SongDetails } from "../song/song-details";

export interface TrackList {

    totalDurationInEpochMilli: string;
    albumPopularityRate: number;
    songList: SongDetails[];

}