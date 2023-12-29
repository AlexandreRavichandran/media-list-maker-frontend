import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from '../abstract-service.services';
import { ApiServiceConstants } from '../../constants/api-service-constants';
import { Observable } from 'rxjs';
import { MovieSearchList } from '../../models/movie/search/movie-search-list';
import { MovieDetails } from '../../models/movie/search/movie-details';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchService } from '../search-service.services';

@Injectable({
  providedIn: 'root'
})
export class MovieSearchService extends AbstractService implements SearchService {

  constructor(private http: HttpClient) {
    super(ApiServiceConstants.SERVICE_MOVIE);
  }

  public browseByQuery(movieName: string): Observable<MovieSearchList> {

    return this.http.get<MovieSearchList>(`${this.getResourceUrl()}/omdbapi/names/${movieName}`);

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
