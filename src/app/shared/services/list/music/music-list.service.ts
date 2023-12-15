import { Injectable } from '@angular/core';
import { AbstractService } from '../../abstract-service.services';
import { HttpClient } from '@angular/common/http';
import { ApiServiceConstants } from 'src/app/shared/constants/api-service-constants';
import { MusicListItem } from 'src/app/shared/models/list/music-list-item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicListService extends AbstractService {

  constructor(private http: HttpClient) {
    super(ApiServiceConstants.SERVICE_LIST_MUSIC);
  }

  public browse(): Observable<MusicListItem[]> {
    return this.http.get<MusicListItem[]>(`${this.getResourceUrl()}`);
  }

  public browseLatest(): Observable<MusicListItem[]> {
    return this.http.get<MusicListItem[]>(`${this.getResourceUrl()}/latest`);
  }

  public add(musicApiCode: string): Observable<MusicListItem> {
    return this.http.post<MusicListItem>(`${this.getResourceUrl()}`, { apiCode: musicApiCode });
  }

  public deleteById(musicId: number): Observable<MusicListItem> {
    return this.http.delete<MusicListItem>(`${this.getResourceUrl()}/${musicId}`);
  }

}
