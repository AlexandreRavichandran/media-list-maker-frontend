import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, forkJoin, take } from 'rxjs';
import { AlbumSearchList } from 'src/app/shared/models/music/search/album/album-search-list';
import { getCurrentIndex, getCurrentPage, getIsLoading, getSearchResults, getSearchedQuery } from '../../state/selectors/search.selectors';
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

    this.getAlbums();

  }

  onClickAlbumDetails(albumApiCode: string): void {
    this.router.navigate(['/search/albums', albumApiCode]);
  }

  onChangePage(item: any): void {
    this.store.dispatch(SearchPageActions.onChangePage({ nextIndex: item.nextIndex, nextPage: item.nextPage }));
    this.getAlbums();
  }


  private getAlbums(): void {
    combineLatest([
      this.store.select(getSearchedQuery),
      this.store.select(getCurrentIndex)
    ]).pipe(take(1)).subscribe(
      ([query, index]) => {
        console.log("test")
        this.store.dispatch(SearchPageActions.onToggleLoading());
        this.store.dispatch(SearchPageActions.onSearchElement({ query, elementType: SearchTypeConstants.TYPE_ALBUM_ID, index }));
      });

  }
}
