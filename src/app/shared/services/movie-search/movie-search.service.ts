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

  public browseByQueryAndIndex(movieName: string, index: number = 0): Observable<MovieSearchList> {

    const params: HttpParams = new HttpParams().set('name', movieName).set('index', index);

    return this.http.get<MovieSearchList>(`${this.getResourceUrl()}/omdbapi`, { params });

  }

  public browseByQueryAndFilter(movieName: string, index: number = 0, filters: MovieSearchRequest): Observable<MovieSearchList> {

    let params: HttpParams = this.getHttpParamByQueryObject(filters);

    params = params.append('name', movieName).append('index', index);

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
