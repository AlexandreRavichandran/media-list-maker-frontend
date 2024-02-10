import { Injectable } from '@angular/core';
import { AbstractService } from '../../abstract-service.services';
import { HttpClient } from '@angular/common/http';
import { ApiServiceConstants } from 'src/app/shared/constants/api-service-constants';
import { Observable, map, of, switchMap } from 'rxjs';
import { MovieListItem } from 'src/app/shared/models/list/movie/movie-list-item';
import { MovieService } from '../../movie/movie.service';

@Injectable({
  providedIn: 'root'
})
export class MovieListService extends AbstractService {

  constructor(private http: HttpClient, private movieService: MovieService) {
    super(ApiServiceConstants.SERVICE_LIST_MOVIE);
  }

  public browse(): Observable<MovieListItem[]> {
    return this.http.get<MovieListItem[]>(`${this.getResourceUrl()}`).pipe(
      switchMap((movieListItems: MovieListItem[]) => {

        if (movieListItems.length === 0) {
          return of([]);
        }

        return this.getMovieRelatedDetailsByMovieIds(movieListItems);

      })
    );
  }

  public browseLatest(): Observable<MovieListItem[]> {
    return this.http.get<MovieListItem[]>(`${this.getResourceUrl()}/latest`).pipe(
      switchMap((movieListItems: MovieListItem[]) => {

        if (movieListItems.length === 0) {
          return of([]);
        }

        return this.getMovieRelatedDetailsByMovieIds(movieListItems);

      })
    );
  }

  public getRandom(): Observable<MovieListItem> {
    return this.http.get<MovieListItem>(`${this.getResourceUrl()}/random`);
  }

  public editSortingOrder(listItemId: number, newSortingNumber: number): Observable<MovieListItem[]> {
    return this.http.put<MovieListItem[]>(`${this.getResourceUrl()}/${listItemId}`, newSortingNumber).pipe(
      switchMap((movieListItems: MovieListItem[]) => {

        return this.getMovieRelatedDetailsByMovieIds(movieListItems);

      })
    );
  }

  public add(movieApiCode: string): Observable<MovieListItem> {
    return this.http.post<MovieListItem>(`${this.getResourceUrl()}`, { apiCode: movieApiCode });
  }

  public isAlreadyInAppUserMovieList(movieApiCode: string): Observable<boolean> {

    return this.http.get<boolean>(`${this.getResourceUrl()}/apicode/${movieApiCode}`);
  }

  public deleteById(movieId: number): Observable<MovieListItem> {
    return this.http.delete<MovieListItem>(`${this.getResourceUrl()}/${movieId}`);
  }

  private getMovieRelatedDetailsByMovieIds(movieListItems: MovieListItem[]): Observable<MovieListItem[]> {

    const movieIds: number[] = movieListItems.map(movieListItem => movieListItem.movieId);
    return this.movieService.browseByIds(movieIds).pipe(
      map(movieDetailList => {
        return movieListItems.map(movieListItem => {
          const movieDetail = movieDetailList.find(m => m.id === movieListItem.movieId);
          return { ...movieListItem, movieDetail } as MovieListItem;
        });
      })
    );

  }

}
