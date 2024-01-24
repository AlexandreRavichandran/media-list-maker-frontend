import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ElementSearchResult } from '../shared/models/element-search-result';
import { AlbumSearchService } from '../shared/services/music-search/album/album-search.service';
import { MovieSearchService } from '../shared/services/movie-search/movie-search.service';
import { SearchService } from '../shared/services/search-service.services';
import { SearchTypeConstants } from '../shared/constants/search-type.constants';
import { BaseSearchRequest } from '../shared/models/base-search-request';
import { Store } from '@ngrx/store';
import { SearchState } from './state/search.state';
import { getIsLoading, getIsSearchResultsDisplayed, getSearchResults } from './state/selectors/search.selectors';
import { SearchPageActions } from './state/actions';

@Component({
  selector: 'mlm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup = this.generateSearchForm();
  searchResults$: Observable<ElementSearchResult | null> = this.searchStore.select(getSearchResults);
  searchButtonStyle: string = 'search__movie__button';
  isSearchDisplayed$: Observable<boolean> = this.searchStore.select(getIsSearchResultsDisplayed);
  searchTypeConstants: SearchTypeConstants = new SearchTypeConstants();
  serviceId: number = 2;
  isSearchLoading$: Observable<boolean | null> = this.searchStore.select(getIsLoading);


  constructor(
    private searchStore: Store<SearchState>,
    private activatedRoute: ActivatedRoute,
    private albumSearchService: AlbumSearchService,
    private movieSearchService: MovieSearchService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(param => {
      if (!!param['type']) {
        this.searchForm.controls['type'].setValue(param['type']);
      }
    });

  }

  private generateSearchForm(): FormGroup {
    return new FormGroup({
      type: new FormControl(1, Validators.required),
      query: new FormControl('', [Validators.required, Validators.min(2)])
    });
  }

  onQueryChange(): void {
    this.searchStore.dispatch(SearchPageActions.onSetIsSearchResultsDisplayed({ isSearchResultsDisplayed: false }));
  }

  onSearch(): void {

    this.searchStore.dispatch(SearchPageActions.onSetIsSearchResultsDisplayed({ isSearchResultsDisplayed: false }));

    if (!this.isFormValid()) {
      return;
    }

    if (this.searchForm.controls['type'].value == 1) {
      this.serviceId = SearchTypeConstants.TYPE_MOVIE_ID;
    } else {
      this.serviceId = SearchTypeConstants.TYPE_ALBUM_ID;
    }

    this.searchStore.dispatch(SearchPageActions.onSetQuery({ query: this.searchForm.value.query }));

    this.searchStore.dispatch(SearchPageActions.onSetIsSearchResultsDisplayed({ isSearchResultsDisplayed: true }));

  }

  isFormValid(): boolean {
    return this.searchForm.valid;
  }

  onTypeChange(): void {

    if (this.searchForm.controls['type'].value === SearchTypeConstants.TYPE_MOVIE_ID) {
      this.searchButtonStyle = 'search__movie__button';
    } else {
      this.searchButtonStyle = 'search__music__button';
    }
    this.searchStore.dispatch(SearchPageActions.onSetIsSearchResultsDisplayed({ isSearchResultsDisplayed: false }));
  }

  //TODO To be managed by ngrx
  onApplyFilter(filters: BaseSearchRequest): void {

    const type: string = this.searchForm.controls['type'].value;

    const service: SearchService = this.getServiceByType(1);

    filters.name = this.searchForm.controls['query'].value;

    this.searchResults$ = service.browseByQueryAndFilter(filters);

  }

  //TODO To delete after tranfeing filter to ngrx
  private getServiceByType(type: number): SearchService {

    switch (type) {

      case SearchTypeConstants.TYPE_MOVIE.value:
        return this.movieSearchService;

      case SearchTypeConstants.TYPE_MOVIE.value:
        return this.albumSearchService;

    }

    return this.albumSearchService;
  }

}
