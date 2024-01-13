import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from '../abstract-service.services';
import { ApiServiceConstants } from '../../constants/api-service-constants';
import { Observable } from 'rxjs';
import { MovieSearchList } from '../../models/movie/search/movie-search-list';
import { MovieDetails } from '../../models/movie/search/movie-details';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchService } from '../search-service.services';
import { MovieSearchRequest } from '../../models/movie/search/movie-search-request';

@Injectable({
  providedIn: 'root'
})
export class MovieSearchService extends AbstractService implements SearchService {

  constructor(private http: HttpClient) {
    super(ApiServiceConstants.SERVICE_MOVIE);
  }

  public browseByQueryAndIndex(movieName: string): Observable<MovieSearchList> {

    const params: HttpParams = new HttpParams().set('name', movieName);

    return this.http.get<MovieSearchList>(`${this.getResourceUrl()}/omdbapi`, { params });

  }

  public browseByQueryAndFilter(filters: MovieSearchRequest): Observable<MovieSearchList> {

    const params: HttpParams = this.getHttpParamByQueryObject(filters);

    return this.http.get<MovieSearchList>(`${this.getResourceUrl()}/omdbapi`, { params });

  }

  public getByApiCode(movieApiCode: string): Observable<MovieDetails> {

    return this.http.get<MovieDetails>(`${this.getResourceUrl()}/omdbapi/apicodes/${movieApiCode}`);

  }

  public generateFilterForm(): FormGroup {

    return new FormGroup({
      year: new FormControl('', Validators.required)
    });

  }

}
