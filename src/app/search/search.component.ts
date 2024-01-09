import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ElementSearchResult } from '../shared/models/element-search-result';
import { AlbumSearchService } from '../shared/services/music-search/album/album-search.service';
import { MovieSearchService } from '../shared/services/movie-search/movie-search.service';
import { SearchService } from '../shared/services/search-service.services';
import { SearchTypeConstants } from '../shared/constants/search-type.constants';
import { BaseSearchRequest } from '../shared/models/base-search-request';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'mlm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup = this.generateSearchForm();
  searchResult$: Observable<ElementSearchResult> = of();
  searchButtonStyle: string = 'search__movie__button';
  isSearchDisplayed: boolean = false;
  searchTypeConstants: SearchTypeConstants = new SearchTypeConstants();
  type!: string;
  searchBarState: string = "default";

  constructor(
    private activatedRoute: ActivatedRoute,
    private albumSearchService: AlbumSearchService,
    private movieSearchService: MovieSearchService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(param => {
      if (param['type'] !== null) {
        this.searchForm.controls['type'].setValue(param['type']);
      }
    });

    this.searchForm.controls['type'].setValue('album');

  }

  private generateSearchForm(): FormGroup {
    return new FormGroup({
      type: new FormControl('movie', Validators.required),
      query: new FormControl('', Validators.required)
    });
  }

  onSearch(): void {

    if (!this.isFormValid()) {
      return;
    }

    this.type = this.searchForm.controls['type'].value;

    const service: SearchService = this.getServiceByType(this.type);

    this.searchResult$ = service.browseByQuery(this.searchForm.controls['query'].value);

    this.isSearchDisplayed = true;
  }

  isFormValid(): boolean {
    return this.searchForm.valid;
  }

  onTypeChange(): void {

    if (this.searchForm.controls['type'].value === 'movie') {
      this.searchButtonStyle = 'search__movie__button';
    } else {
      this.searchButtonStyle = 'search__music__button';
    }
    this.searchResult$ = of();
    this.isSearchDisplayed = false;
  }

  onApplyFilter(filters: BaseSearchRequest): void {

    const type: string = this.searchForm.controls['type'].value;

    const service: SearchService = this.getServiceByType(type);

    filters.name = this.searchForm.controls['query'].value;

    this.searchResult$ = service.browseByQueryAndFilter(filters);

  }

  private getServiceByType(type: string): SearchService {

    switch (type) {

      case SearchTypeConstants.TYPE_MOVIE:
        return this.movieSearchService;

      case SearchTypeConstants.TYPE_ALBUM:
        return this.albumSearchService;

    }

    return this.albumSearchService;
  }

  getLoadingColorBySearchType(): string {

    switch (this.type) {

      case SearchTypeConstants.TYPE_MOVIE:
        return "#950000";

      case SearchTypeConstants.TYPE_ALBUM:
        return "#950000";
    }
    return "#FFFFFF";


  }


}
