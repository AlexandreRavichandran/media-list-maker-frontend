import { Injectable } from '@angular/core';
import { AbstractService } from '../../abstract-service.services';
import { HttpClient } from '@angular/common/http';
import { ApiServiceConstants } from 'src/app/shared/constants/api-service-constants';
import { MusicListItem } from 'src/app/shared/models/list/music/music-list-item';
import { Observable, map, switchMap } from 'rxjs';
import { MusicService } from '../../music/music.service';

@Injectable({
  providedIn: 'root'
})
export class MusicListService extends AbstractService {

  constructor(private http: HttpClient, private musicService: MusicService) {
    super(ApiServiceConstants.SERVICE_LIST_MUSIC);
  }

  public browse(): Observable<MusicListItem[]> {
    return this.http.get<MusicListItem[]>(`${this.getResourceUrl()}`);
  }

  public browseLatest(): Observable<MusicListItem[]> {
    return this.http.get<MusicListItem[]>(`${this.getResourceUrl()}/latest`).pipe(
      switchMap((musicListItems: MusicListItem[]) => {
        const musicIds: number[] = musicListItems.map(musicListItem => musicListItem.musicId);
        return this.musicService.browseByIds(musicIds).pipe(
          map(musicDetailList => {
            return musicListItems.map(musicListItem => {
              const musicDetail = musicDetailList.find(m => m.id === musicListItem.musicId);
              return { ...musicListItem, musicDetail } as MusicListItem;
            });
          })
        );
      })
    );
  }

  public add(musicApiCode: string): Observable<MusicListItem> {
    return this.http.post<MusicListItem>(`${this.getResourceUrl()}`, { apiCode: musicApiCode });
  }

  public deleteById(musicId: number): Observable<MusicListItem> {
    return this.http.delete<MusicListItem>(`${this.getResourceUrl()}/${musicId}`);
  }

}
