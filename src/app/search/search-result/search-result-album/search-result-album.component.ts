import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AlbumSearchList } from 'src/app/shared/models/music/search/album/album-search-list';
import { getIsLoading, getSearchResults, getSearchedQuery } from '../../state/selectors/search.selectors';
import { SearchPageActions } from '../../state/actions';
import { SearchTypeConstants } from 'src/app/shared/constants/search-type.constants';

@Component({
  selector: 'mlm-search-result-album',
  templateUrl: './search-result-album.component.html',
  styleUrls: ['./search-result-album.component.scss']
})
export class SearchResultAlbumComponent implements OnInit {

  @Input()
  searchResults$: Observable<AlbumSearchList | null> = this.store.select(getSearchResults);

  @Output()
  onChangePageEvent: EventEmitter<number> = new EventEmitter();

  isSearchLoading$: Observable<boolean> = this.store.select(getIsLoading);

  constructor(private router: Router, private store: Store<AlbumSearchList>) { }

  ngOnInit(): void {

    this.store.select(getSearchedQuery).subscribe(
      query => {
        this.store.dispatch(SearchPageActions.onClearSearchResults());
        this.store.dispatch(SearchPageActions.onToggleLoading());
        this.store.dispatch(SearchPageActions.onSearchElement({ query, elementType: SearchTypeConstants.TYPE_ALBUM_ID }));
      });

  }

  onClickAlbumDetails(albumApiCode: string): void {
    this.router.navigate(['/search/albums', albumApiCode]);
  }

  onChangePage(index: number): void {

  }
}
