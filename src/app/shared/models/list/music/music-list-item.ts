import { Music } from "../../music/music";

export interface MusicListItem {

    id: number;
    musicId: number;
    appUserId: number;
    sortingNumber: number;
    addedAt: Date;
    musicDetail: Music | undefined;
}