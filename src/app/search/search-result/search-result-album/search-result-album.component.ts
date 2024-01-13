import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumSearchList } from 'src/app/shared/models/music/search/album/album-search-list';

@Component({
  selector: 'mlm-search-result-album',
  templateUrl: './search-result-album.component.html',
  styleUrls: ['./search-result-album.component.scss']
})
export class SearchResultAlbumComponent {

  @Input()
  searchResults!: AlbumSearchList;

  @Output()
  onChangePageEvent: EventEmitter<number> = new EventEmitter();

  constructor(private router: Router) { }

  onClickAlbumDetails(albumApiCode: string): void {
    this.router.navigate(['/search/albums', albumApiCode]);
  }

  onChangePage(index: number): void {
    this.onChangePageEvent.emit(index);
  }
}
