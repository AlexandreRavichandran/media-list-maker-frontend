import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SearchPageActions } from 'src/app/search/state/actions';
import { SearchState } from 'src/app/search/state/search.state';
import { getSearchElementDatas } from 'src/app/search/state/selectors/search.selectors';
import { SearchTypeConstants } from 'src/app/shared/constants/search-type.constants';
import { MovieSearchRequest } from 'src/app/shared/models/movie/search/movie-search-request';
import { MovieSearchService } from 'src/app/shared/services/movie-search/movie-search.service';

@Component({
  selector: 'mlm-movie-filter-form',
  templateUrl: './movie-filter-form.component.html',
  styleUrls: ['./movie-filter-form.component.scss']
})
export class MovieFilterFormComponent {

  movieForm: FormGroup = this.movieSearchService.generateFilterForm();

  @Output()
  applyFilterEvent: EventEmitter<MovieSearchRequest> = new EventEmitter();

  constructor(private movieSearchService: MovieSearchService, private searchStore: Store<SearchState>) { }

  onResetForm(): void {
    this.searchStore.dispatch(SearchPageActions.onClearFilter());
    this.movieForm.reset();
  }

  onApplyFilter(): void {
    const movieForm: MovieSearchRequest = this.movieForm.value;
    this.searchStore.dispatch(SearchPageActions.onResetPagination());
    this.searchStore.dispatch(SearchPageActions.onClearSearchResults());
    this.searchStore.dispatch(SearchPageActions.onSetFilterForm({ filterForm: movieForm }));

    this.searchStore.select(getSearchElementDatas).subscribe((element) => {

      this.searchStore.dispatch(SearchPageActions.onSearchElementWithFilter(
        { query: element.query, elementType: SearchTypeConstants.TYPE_MOVIE.value, index: element.currentIndex, filter: movieForm }
      ));


    }).unsubscribe();
  }

}
