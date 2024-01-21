import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MovieSearchList } from 'src/app/shared/models/movie/search/movie-search-list';
import { getIsLoading, getSearchResults, getSearchedQuery } from '../../state/selectors/search.selectors';
import { SearchPageActions } from '../../state/actions';
import { SearchTypeConstants } from 'src/app/shared/constants/search-type.constants';

@Component({
  selector: 'mlm-search-result-movie',
  templateUrl: './search-result-movie.component.html',
  styleUrls: ['./search-result-movie.component.scss']
})
export class SearchResultMovieComponent implements OnInit {

  @Input()
  searchResults$: Observable<MovieSearchList | null> = this.store.select(getSearchResults);

  isSearchLoading$: Observable<boolean> = this.store.select(getIsLoading);

  constructor(private router: Router, private store: Store<MovieSearchList>) { }

  ngOnInit(): void {

    this.store.select(getSearchedQuery).subscribe(
      query => {
        this.store.dispatch(SearchPageActions.onClearSearchResults());
        this.store.dispatch(SearchPageActions.onToggleLoading());
        this.store.dispatch(SearchPageActions.onSearchElement({ query, elementType: SearchTypeConstants.TYPE_MOVIE_ID }));
      });

  }

  onClickMovieDetails(movieApiCode: string): void {
    this.router.navigate(['/search/movies', movieApiCode]);
  }

}
