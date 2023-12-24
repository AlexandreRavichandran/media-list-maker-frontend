import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SongDetails } from 'src/app/shared/models/music/search/song/song-details';

@Component({
  selector: 'mlm-song-item',
  templateUrl: './song-item.component.html',
  styleUrls: ['./song-item.component.scss']
})
export class SongItemComponent {

  @Input()
  song!: SongDetails;

  @Input()
  isSongSelected: boolean = false;

  @Output()
  onSelectSongEvent: EventEmitter<SongDetails> = new EventEmitter();

  onSelectSong(): void {
    this.onSelectSongEvent.emit(this.song);
  }

}
