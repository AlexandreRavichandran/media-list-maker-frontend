import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicListItem } from 'src/app/shared/models/list/music/music-list-item';
import { MusicListService } from 'src/app/shared/services/list/music/music-list.service';

@Component({
  selector: 'mlm-music-list-home',
  templateUrl: './music-list-home.component.html',
  styleUrls: ['./music-list-home.component.scss']
})
export class MusicListHomeComponent {

  userMusicList$: Observable<MusicListItem[]> = this.getUserMusicList();

  constructor(private musicListService: MusicListService) { }

  private getUserMusicList(): Observable<MusicListItem[]> {
    return this.musicListService.browseLatest();
  }
}
