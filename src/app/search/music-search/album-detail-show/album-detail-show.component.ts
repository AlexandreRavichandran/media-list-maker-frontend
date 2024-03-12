import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, map, of, shareReplay, switchMap } from 'rxjs';
import { MusicTypeConstants } from 'src/app/shared/constants/music-type-constants';
import { NotificationTypeConstant } from 'src/app/shared/constants/notification-type.constant';
import { ArtistRelatedAlbum } from 'src/app/shared/models/artist/artist-related-albums';
import { AlbumDetails } from 'src/app/shared/models/music/search/album/album-details';
import { TrackList } from 'src/app/shared/models/music/search/album/track-list';
import { SongDetails } from 'src/app/shared/models/music/search/song/song-details';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { MusicListService } from 'src/app/shared/services/list/music/music-list.service';
import { AlbumSearchService } from 'src/app/shared/services/music-search/album/album-search.service';
import { ArtistService } from 'src/app/shared/services/music-search/artist/artist.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

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
  artistRelatedAlbums$!: Observable<ArtistRelatedAlbum>;
  displayAddLoadingButton: boolean = false;

  constructor(
    private albumSearchService: AlbumSearchService,
    private artistService: ArtistService,
    private musicListService: MusicListService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private notificationService: NotificationService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const apiCode: string | null = this.activatedRoute.snapshot.paramMap.get('apicode');

    if (apiCode === null) {
      this.router.navigate(['/me']);
      return;
    }

    this.getAlbumRelatedDataByApiCode(apiCode);

  }

  onAddToList(apiCode: string): void {

    if (!this.authService.isUserLogged()) {
      this.router.navigate(['/login']);
      return;
    }

    this.displayAddLoadingButton = true;
    this.musicListService.add(apiCode, MusicTypeConstants.MUSIC_TYPE_ALBUM)
      .pipe(
        map(response => {
          this.displayAddLoadingButton = false;
          this.isAlreadyInList$ = of(true);
          this.notificationService.addNewNotification('Album added in list !', NotificationTypeConstant.SUCCESS.type);
          return response;
        }),
        catchError(error => {
          this.displayAddLoadingButton = false;
          this.isAlreadyInList$ = of(false);
          this.notificationService.addNewNotification(error.message, NotificationTypeConstant.ERROR.type);
          return of(null);
        })
      )
      .subscribe();

  }

  onChangeAlbumByApiCode(apiCode: string): void {
    this.getAlbumRelatedDataByApiCode(apiCode);
  }

  private getAlbumRelatedDataByApiCode(apiCode: string): void {

    this.router.navigate(['/search/albums/', apiCode]);

    this.albumDetail$ = this.albumSearchService.readByApiCode(apiCode)
      .pipe(
        shareReplay(1)
      );
    this.trackList$ = this.albumSearchService.getTrackListByApiCode(apiCode);
    this.isAlreadyInList$ = this.musicListService.isAlreadyInAppuserMusicList(apiCode, MusicTypeConstants.MUSIC_TYPE_ALBUM)
      .pipe(
        shareReplay(1)
      );

    this.artistRelatedAlbums$ = this.albumDetail$.pipe(
      switchMap((album) => {
        return this.artistService.browseAlbumByArtistApiCode(album.artist.apiCode);
      })
    );
  }

  goBack(): void {
    this.location.back();
  }

  getLoadingColor(): string {
    return "#950000";
  }

  addGenericPictureIfPictureIsNull(pictureUrl: string): string {

    if (pictureUrl === 'N/A') {
      return 'assets/music_poster_not_found.png';
    }

    return pictureUrl;

  }

}
