import { Injectable } from '@angular/core';
import { AbstractService } from '../../abstract-service.services';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiServiceConstants } from 'src/app/shared/constants/api-service-constants';
import { MusicListItem } from 'src/app/shared/models/list/music/music-list-item';
import { Observable, map, of, switchMap } from 'rxjs';
import { MusicService } from '../../music/music.service';

@Injectable({
  providedIn: 'root'
})
export class MusicListService extends AbstractService {

  constructor(private http: HttpClient, private musicService: MusicService) {
    super(ApiServiceConstants.SERVICE_LIST_MUSIC);
  }

  public browse(): Observable<MusicListItem[]> {
    return this.http.get<MusicListItem[]>(`${this.getResourceUrl()}`).pipe(
      switchMap((musicListItems: MusicListItem[]) => {

        if (musicListItems.length === 0) {
          return of([]);
        }

        return this.getMusicRelatedDetails(musicListItems);

      })
    );
  }

  public browseLatest(): Observable<MusicListItem[]> {
    return this.http.get<MusicListItem[]>(`${this.getResourceUrl()}/latest`).pipe(
      switchMap((musicListItems: MusicListItem[]) => {

        if (musicListItems.length === 0) {
          return of([]);
        }

        return this.getMusicRelatedDetails(musicListItems);

      })
    );
  }

  public editSortingOrder(listItemId: number, newSortingNumber: number): Observable<MusicListItem[]> {
    return this.http.put<MusicListItem[]>(`${this.getResourceUrl()}/${listItemId}`, newSortingNumber).pipe(
      switchMap((musicListItems: MusicListItem[]) => {

        return this.getMusicRelatedDetails(musicListItems);

      })
    );
  }

  public add(musicApiCode: string, type: number): Observable<MusicListItem> {
    return this.http.post<MusicListItem>(`${this.getResourceUrl()}`, { apiCode: musicApiCode, type: type });
  }

  public isAlreadyInAppuserMusicList(musicApiCode: string, type: number): Observable<boolean> {

    let params: HttpParams = new HttpParams().append('type', type);

    return this.http.get<boolean>(`${this.getResourceUrl()}/apicode/${musicApiCode}`, { params });
  }

  public deleteById(musicId: number): Observable<MusicListItem> {
    return this.http.delete<MusicListItem>(`${this.getResourceUrl()}/${musicId}`);
  }

  private getMusicRelatedDetails(musicListItems: MusicListItem[]): Observable<MusicListItem[]> {

    const musicIds: number[] = musicListItems.map(musicListItem => musicListItem.musicId);

    return this.musicService.browseByIds(musicIds).pipe(
      map(musicDetailList => {
        return musicListItems.map(musicListItem => {
          const musicDetail = musicDetailList.find(m => m.id === musicListItem.musicId);
          return { ...musicListItem, musicDetail } as MusicListItem;
        });
      })
    );
  }

}
