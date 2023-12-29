import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { MusicTypeConstants } from 'src/app/shared/constants/music-type-constants';
import { AlbumDetails } from 'src/app/shared/models/music/search/album/album-details';
import { TrackList } from 'src/app/shared/models/music/search/album/track-list';
import { SongDetails } from 'src/app/shared/models/music/search/song/song-details';
import { MusicListService } from 'src/app/shared/services/list/music/music-list.service';
import { AlbumSearchService } from 'src/app/shared/services/music-search/album/album.service';

@Component({
  selector: 'mlm-album-detail-show',
  templateUrl: './album-detail-show.component.html',
  styleUrls: ['./album-detail-show.component.scss']
})
export class AlbumDetailShowComponent implements OnInit {

  selectedSong$!: Observable<SongDetails>;
  isAlreadyInList$!: Observable<boolean>;
  albumDetail$!: Observable<AlbumDetails>;
  trackList$!: Observable<TrackList>;

  constructor(
    private albumSearchService: AlbumSearchService,
    private musicListService: MusicListService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const apiCode: string | null = this.activatedRoute.snapshot.paramMap.get('apicode');

    if (apiCode === null) {
      this.router.navigate(['/me']);
      return;
    }

    this.albumDetail$ = this.albumSearchService.readByApiCode(apiCode);
    this.trackList$ = this.albumSearchService.getTrackListByApiCode(apiCode);
    this.isAlreadyInList$ = this.musicListService.isAlreadyInAppuserMusicList(apiCode, MusicTypeConstants.MUSIC_TYPE_ALBUM);

  }

  onAddToList(apiCode: string): void {

    this.musicListService.add(apiCode, MusicTypeConstants.MUSIC_TYPE_ALBUM)
      .pipe(
        map(response => {
          console.log(response);

          this.isAlreadyInList$ = of(true);

          return response;
        }),
        catchError(error => {
          console.log(error);
          return of(null);
        })
      )
      .subscribe();

  }
}
