import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from '../../abstract-service.services';
import { ApiServiceConstants } from 'src/app/shared/constants/api-service-constants';
import { SongSearchList } from 'src/app/shared/models/music/search/song/song-search-list';
import { Observable } from 'rxjs';
import { SongDetails } from 'src/app/shared/models/music/search/song/song-details';

@Injectable({
  providedIn: 'root'
})
export class SongService extends AbstractService {

  constructor(private http: HttpClient) {
    super(ApiServiceConstants.SERVICE_MUSIC);
  }

  public browseBySongName(songName: string): Observable<SongSearchList> {
    const params: HttpParams = new HttpParams().set('name', songName);
    return this.http.get<SongSearchList>(`${this.getResourceUrl()}/deezerapi/songs`, { params });
  }

  public readByApiCode(songApiCode: string): Observable<SongDetails> {
    return this.http.get<SongDetails>(`${this.getResourceUrl()}/deezerapi/songs/apicodes/${songApiCode}`);
  }

}
