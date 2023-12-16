import { Injectable } from '@angular/core';
import { AbstractService } from '../../abstract-service.services';
import { HttpClient } from '@angular/common/http';
import { ApiServiceConstants } from 'src/app/shared/constants/api-service-constants';
import { Observable } from 'rxjs';
import { MovieListItem } from 'src/app/shared/models/list/movie/movie-list-item';

@Injectable({
  providedIn: 'root'
})
export class MovieListService extends AbstractService {

  constructor(private http: HttpClient) {
    super(ApiServiceConstants.SERVICE_LIST_MOVIE);
  }

  public browse(): Observable<MovieListItem[]> {
    return this.http.get<MovieListItem[]>(`${this.getResourceUrl()}`);
  }

  public browseLatest(): Observable<MovieListItem[]> {
    return this.http.get<MovieListItem[]>(`${this.getResourceUrl()}/latest`);
  }

  public add(movieApiCode: string): Observable<MovieListItem> {
    return this.http.post<MovieListItem>(`${this.getResourceUrl()}`, { apiCode: movieApiCode });
  }

  public deleteById(movieId: number): Observable<MovieListItem> {
    return this.http.delete<MovieListItem>(`${this.getResourceUrl()}/${movieId}`);
  }

}
