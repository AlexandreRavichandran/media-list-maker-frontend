import { Injectable } from '@angular/core';
import { AbstractService } from '../../abstract-service.services';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiServiceConstants } from '../../../constants/api-service-constants';
import { Observable } from 'rxjs';
import { AlbumSearchList } from 'src/app/shared/models/music/search/album/album-search-list';
import { AlbumDetails } from 'src/app/shared/models/music/search/album/album-details';
import { TrackList } from 'src/app/shared/models/music/search/album/track-list';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchService } from '../../search-service.services';
import { AlbumSearchRequest } from 'src/app/shared/models/music/search/album/album-search-request';

@Injectable({
  providedIn: 'root'
})
export class AlbumSearchService extends AbstractService implements SearchService {

  constructor(private http: HttpClient) {
    super(ApiServiceConstants.SERVICE_MUSIC);
  }

  public browseByQueryAndIndex(albumName: string, index: number = 0): Observable<AlbumSearchList> {
    let params: HttpParams = new HttpParams().set('name', albumName).set('index', index);
    return this.http.get<AlbumSearchList>(`${this.getResourceUrl()}/deezerapi/albums`, { params });
  }

  public browseByQueryAndFilter(query: string, index: number = 0, filters: AlbumSearchRequest): Observable<AlbumSearchList> {

    let params: HttpParams = this.getHttpParamByQueryObject(filters);

    params = params.append('name', query).append('index', index);

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
