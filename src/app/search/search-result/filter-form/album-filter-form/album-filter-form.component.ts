import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SearchPageActions } from 'src/app/search/state/actions';
import { onResetPagination } from 'src/app/search/state/actions/page/search-page.actions';
import { SearchState } from 'src/app/search/state/search.state';
import { getSearchElementDatas, getSearchedQuery } from 'src/app/search/state/selectors/search.selectors';
import { SearchTypeConstants } from 'src/app/shared/constants/search-type.constants';
import { AlbumSearchRequest } from 'src/app/shared/models/music/search/album/album-search-request';
import { AlbumSearchService } from 'src/app/shared/services/music-search/album/album-search.service';

@Component({
  selector: 'mlm-album-filter-form',
  templateUrl: './album-filter-form.component.html',
  styleUrls: ['./album-filter-form.component.scss']
})
export class AlbumFilterFormComponent {

  albumForm: FormGroup = this.albumSearchService.generateFilterForm();

  @Output()
  applyFilterEvent: EventEmitter<AlbumSearchRequest> = new EventEmitter();

  constructor(
    private albumSearchService: AlbumSearchService,
    private searchStore: Store<SearchState>
  ) { }

  onResetForm(): void {
    this.searchStore.dispatch(SearchPageActions.onClearFilter());
    this.albumForm.reset();
  }

  onApplyFilter(): void {
    const albumForm: AlbumSearchRequest = this.albumForm.value;
    this.searchStore.dispatch(SearchPageActions.onResetPagination());
    this.searchStore.dispatch(SearchPageActions.onClearSearchResults());
    this.searchStore.dispatch(SearchPageActions.onSetFilterForm({ filterForm: albumForm }));

    this.searchStore.select(getSearchElementDatas).subscribe((element) => {

      this.searchStore.dispatch(SearchPageActions.onSearchElementWithFilter(
        { query: element.query, elementType: SearchTypeConstants.TYPE_ALBUM_ID, index: element.currentIndex, filter: albumForm }
      ));


    }).unsubscribe();
  }

}
