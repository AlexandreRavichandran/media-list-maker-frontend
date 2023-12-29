import { Component, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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

  constructor(private router: Router) { }

  onClickAlbumDetails(albumApiCode: string): void {
    this.router.navigate(['/search/albums', albumApiCode]);
  }

  handlePageEvent(event: PageEvent) {
    console.log(event);
  }
}
