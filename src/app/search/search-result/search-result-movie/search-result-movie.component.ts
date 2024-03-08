import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MovieSearchList } from 'src/app/shared/models/movie/search/movie-search-list';
import { getCurrentPage, getIsLoading, getSearchElementDatas, getSearchResults } from '../../state/selectors/search.selectors';
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

  currentPage$: Observable<number> = this.store.select(getCurrentPage);

  isSearchLoading$: Observable<boolean> = this.store.select(getIsLoading);

  constructor(private router: Router, private store: Store<MovieSearchList>) { }

  ngOnInit(): void {
    this.getMovies();
  }

  onClickMovieDetails(movieApiCode: string): void {
    this.router.navigate(['/search/movies', movieApiCode]);
  }

  onChangePage(item: any): void {
    this.store.dispatch(SearchPageActions.onChangePage({ nextIndex: item.nextIndex, nextPage: item.nextPage }));
    this.getMovies();
  }

  private getMovies(): void {
    this.store.dispatch(SearchPageActions.onClearSearchResults());
    this.store.dispatch(SearchPageActions.onToggleLoading());
    this.store.select(getSearchElementDatas).subscribe((element) => {

      if (element.filter === null) {
        this.store.dispatch(SearchPageActions.onSearchElement(
          { query: element.query, elementType: SearchTypeConstants.TYPE_MOVIE.value, index: element.currentIndex }));
      } else {
        this.store.dispatch(SearchPageActions.onSearchElementWithFilter(
          { query: element.query, elementType: SearchTypeConstants.TYPE_MOVIE.value, index: element.currentIndex, filter: element.filter }
        ));
      }


    }).unsubscribe();
  }

  addGenericPictureIfPictureIsNull(pictureUrl: string): string {

    if (pictureUrl === 'N/A') {
      return 'assets/movie_poster_not_found.png';
    }

    return pictureUrl;

  }
}
