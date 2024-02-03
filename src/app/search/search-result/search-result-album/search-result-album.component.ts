import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AlbumSearchList } from 'src/app/shared/models/music/search/album/album-search-list';
import { getCurrentPage, getIsLoading, getSearchElementDatas, getSearchResults, getSearchedQuery } from '../../state/selectors/search.selectors';
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

  currentPage$: Observable<number> = this.store.select(getCurrentPage);

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
    this.store.select(getSearchElementDatas).subscribe((element) => {

      if (element.filter === null) {
        this.store.dispatch(SearchPageActions.onSearchElement(
          { query: element.query, elementType: SearchTypeConstants.TYPE_ALBUM_ID, index: element.currentIndex }));
      } else {
        this.store.dispatch(SearchPageActions.onSearchElementWithFilter(
          { query: element.query, elementType: SearchTypeConstants.TYPE_ALBUM_ID, index: element.currentIndex, filter: element.filter }
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
