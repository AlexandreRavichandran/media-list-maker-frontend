import { Music } from "../../music/music";

export interface MusicListItem {

    id: number;
    musicId: number;
    appUserId: number;
    sortingOrder: number;
    addedAt: Date;
    musicDetail: Music | undefined;
}