import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ElementSearchResult } from '../shared/models/element-search-result';
import { AlbumSearchService } from '../shared/services/music-search/album/album.service';
import { MovieSearchService } from '../shared/services/movie-search/movie-search.service';
import { SearchService } from '../shared/services/search-service.services';
import { SearchTypeConstants } from '../shared/constants/search-type.constants';

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

    this.searchForm.controls['type'].setValue('movie');

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

    const type: string = this.searchForm.controls['type'].value;

    const service: SearchService = this.getServiceByType(type);

    this.searchResult$ = service.browseByQuery(this.searchForm.controls['query'].value);

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

}
