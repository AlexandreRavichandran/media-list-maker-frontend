import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, forkJoin } from 'rxjs';
import { MovieSearchList } from 'src/app/shared/models/movie/search/movie-search-list';
import { getCurrentIndex, getIsLoading, getSearchResults, getSearchedQuery } from '../../state/selectors/search.selectors';
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

    forkJoin([
      this.store.select(getSearchedQuery),
      this.store.select(getCurrentIndex)
    ]).subscribe(
      ([query, index]) => {
        this.store.dispatch(SearchPageActions.onClearSearchResults());
        this.store.dispatch(SearchPageActions.onToggleLoading());
        this.store.dispatch(SearchPageActions.onSearchElement({ query, elementType: SearchTypeConstants.TYPE_MOVIE_ID, index }));
      });


  }

  onClickMovieDetails(movieApiCode: string): void {
    this.router.navigate(['/search/movies', movieApiCode]);
  }

}
