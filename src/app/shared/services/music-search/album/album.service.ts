import { Injectable } from '@angular/core';
import { AbstractService } from '../../abstract-service.services';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiServiceConstants } from '../../../constants/api-service-constants';
import { Observable } from 'rxjs';
import { AlbumSearchList } from 'src/app/shared/models/music/search/album/album-search-list';
import { AlbumDetails } from 'src/app/shared/models/music/search/album/album-details';
import { TrackList } from 'src/app/shared/models/music/search/album/track-list';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AlbumService extends AbstractService {

  constructor(private http: HttpClient) {
    super(ApiServiceConstants.SERVICE_MUSIC);
  }

  public browseByAlbumName(albumName: string): Observable<AlbumSearchList> {
    const params: HttpParams = new HttpParams().set('name', albumName);
    return this.http.get<AlbumSearchList>(`${this.getResourceUrl()}/deezerapi/albums`, { params });
  }

  public readByApiCode(albumApiCode: string): Observable<AlbumDetails> {
    return this.http.get<AlbumDetails>(`${this.getResourceUrl()}/deezerapi/albums/apicodes/${albumApiCode}`);
  }

  public getTrackListByApiCode(albumApiCode: string): Observable<TrackList> {
    return this.http.get<TrackList>(`${this.getResourceUrl()}/deezerapi/albums/apicodes/${albumApiCode}/tracklist`);
  }

  public generateFilterForm(): FormGroup {

    return new FormGroup({
      artist: new FormControl(''),
      label: new FormControl('')
    });

  }

}
