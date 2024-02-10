import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { ElementSearchResult } from '../shared/models/element-search-result';
import { SearchTypeConstants } from '../shared/constants/search-type.constants';
import { Store } from '@ngrx/store';
import { SearchState } from './state/search.state';
import { getIsLoading, getIsSearchResultsDisplayed, getSearchElementDatas, getSearchResults } from './state/selectors/search.selectors';
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
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(param => {
      if (!!param['type']) {
        this.searchForm.controls['type'].setValue(param['type']);
      }
    });

    this.searchStore.select(getSearchElementDatas).pipe(map(data => {
      this.searchForm.controls['type'].setValue(data.searchElementType);
      this.serviceId = data.searchElementType;
      this.searchForm.controls['query'].setValue(data.query);
    })).subscribe().unsubscribe();

  }

  private generateSearchForm(): FormGroup {
    return new FormGroup({
      type: new FormControl(1, Validators.required),
      query: new FormControl('', [Validators.required, Validators.min(2)])
    });
  }

  onQueryChange(): void {
    this.resetSearchResults();
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

    this.searchStore.dispatch(SearchPageActions.onChangeSearchElementType({ elementType: this.serviceId }));
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

    this.resetSearchResults();

  }

  public getSearchResultLabel(): string {

    const searchResultLabel: string = "Search results for ";

    if (this.serviceId === SearchTypeConstants.TYPE_MOVIE_ID) {
      return searchResultLabel + "movie " + this.searchForm.value.query.toString().toUpperCase() + " : ";
    }

    if (this.serviceId === SearchTypeConstants.TYPE_ALBUM_ID) {
      return searchResultLabel + "music " + this.searchForm.value.query.toUpperCase() + " : ";
    }

    return "";
  }

  private resetSearchResults(): void {
    this.searchStore.dispatch(SearchPageActions.onClearSearchResults());
    this.searchStore.dispatch(SearchPageActions.onClearFilter());
    this.searchStore.dispatch(SearchPageActions.onResetPagination());
    this.searchStore.dispatch(SearchPageActions.onSetIsSearchResultsDisplayed({ isSearchResultsDisplayed: false }));
  }

}
