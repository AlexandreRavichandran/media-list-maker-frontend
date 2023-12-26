import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicListItem } from 'src/app/shared/models/list/music/music-list-item';
import { MusicListService } from 'src/app/shared/services/list/music/music-list.service';
import { MusicService } from 'src/app/shared/services/music/music.service';

@Component({
  selector: 'mlm-music-list-show',
  templateUrl: './music-list-show.component.html',
  styleUrls: ['./music-list-show.component.scss']
})
export class MusicListShowComponent {

  userMusicList$: Observable<MusicListItem[]> = this.getAllUserMusicList();

  randomMusicPictureUrl$: Observable<string> = this.musicService.getRandomIllustrationPictureUrl();

  constructor(
    private musicListService: MusicListService,
    private musicService: MusicService
  ) { }

  getAllUserMusicList(): Observable<MusicListItem[]> {
    return this.musicListService.browse();
  }

}