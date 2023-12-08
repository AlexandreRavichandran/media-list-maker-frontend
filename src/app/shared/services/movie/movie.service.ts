import { Injectable } from '@angular/core';
import { AbstractService } from '../abstract-service.services';
import { ApiServiceConstants } from '../../constants/api-service-constants';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Movie } from '../../models/movie/movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService extends AbstractService {

  constructor(private http: HttpClient) {
    super(ApiServiceConstants.SERVICE_MOVIE)
  }

  public browseByIds(movieIds: number[]): Observable<Movie[]> {

    let params: HttpParams = new HttpParams();

    movieIds.forEach(movieId => {
      params = params.append("movieIds", movieId);
    });

    return this.http.get<Movie[]>(`${this.getResourceUrl()}`, { params });
  }

  public readByApiCode(movieApiCode: string): Observable<Movie> {

    return this.http.get<Movie>(`${this.getResourceUrl()}/apicodes/${movieApiCode}`);

  }

  public readById(movieId: number): Observable<Movie> {

    return this.http.get<Movie>(`${this.getResourceUrl()}/${movieId}`);

  }

  public addByApiCode(movieApiCode: string): Observable<Movie> {

    return this.http.post<Movie>(`${this.getResourceUrl()}/apicodes/${movieApiCode}`, null);

  }

}
