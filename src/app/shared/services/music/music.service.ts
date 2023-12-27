import { Injectable } from '@angular/core';
import { AbstractService } from '../abstract-service.services';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiServiceConstants } from '../../constants/api-service-constants';
import { Observable, of } from 'rxjs';
import { Music } from '../../models/music/music';

@Injectable({
  providedIn: 'root'
})
export class MusicService extends AbstractService {

  constructor(private http: HttpClient) {
    super(ApiServiceConstants.SERVICE_MUSIC);
  }

  public browseByIds(musicIds: number[]): Observable<Music[]> {

    let params: HttpParams = new HttpParams();

    musicIds.forEach(musicId => {
      params = params.append('musicIds', musicId);
    });

    return this.http.get<Music[]>(`${this.getResourceUrl()}`, { params });
  }

  public browseByType(type: number): Observable<Music[]> {

    return this.http.get<Music[]>(`${this.getResourceUrl()}/types/${type}`);

  }

  public readById(musicId: number): Observable<Music> {

    return this.http.get<Music>(`${this.getResourceUrl()}/${musicId}`);

  }

  public readByApiCode(musicApiCode: string): Observable<Music> {

    return this.http.get<Music>(`${this.getResourceUrl()}/apicodes/${musicApiCode}`);

  }

  public getRandomIllustrationPictureUrl(): Observable<string> {
    return of(`${this.getResourceUrl()}/pictures/random`);
  }
}
