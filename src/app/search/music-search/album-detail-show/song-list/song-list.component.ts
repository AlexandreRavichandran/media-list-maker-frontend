import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { SongDetails } from 'src/app/shared/models/music/search/song/song-details';

@Component({
  selector: 'mlm-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent {

  @Input()
  songList!: SongDetails[];
  selectedSong$!: Observable<SongDetails>;
  isAlreadySelected$!: Observable<boolean>;

  changeSelectedSong(selectedSong: SongDetails) {
    this.selectedSong$ = of(selectedSong);
  }

}
