import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumDetailShowComponent } from './album-detail-show.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from 'src/app/shared/services/music-search/album/album.service';
import { SearchModule } from '../../search.module';
import { AppModule } from 'src/app/app.module';
import { AlbumDetails } from 'src/app/shared/models/music/search/album/album-details';
import { of, throwError } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TrackList } from 'src/app/shared/models/music/search/album/track-list';
import { MusicListItem } from 'src/app/shared/models/list/music/music-list-item';
import { MusicListService } from 'src/app/shared/services/list/music/music-list.service';

describe('Testing Album detail show component', () => {

  let component: AlbumDetailShowComponent;
  let fixture: ComponentFixture<AlbumDetailShowComponent>;
  let mockAlbumSearchService: jasmine.SpyObj<AlbumService>;
  let mockMusicListService: jasmine.SpyObj<MusicListService>;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  beforeEach(async () => {

    mockAlbumSearchService = jasmine.createSpyObj('AlbumSearchService', ['readByApiCode', 'getTrackListByApiCode']);
    mockMusicListService = jasmine.createSpyObj('MusicListService', ['add']);

    await TestBed.configureTestingModule({
      declarations: [AlbumDetailShowComponent],
      imports: [AppModule, SearchModule],
      providers: [
        {
          provide: AlbumService,
          useValue: mockAlbumSearchService
        },
        {
          provide: MusicListService,
          useValue: mockMusicListService
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(AlbumDetailShowComponent);
    component = fixture.componentInstance;

    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display add to list button if music is not in list', () => {

    activatedRoute.snapshot.params = { 'apicode': 'test' };

    const albumDetail: AlbumDetails = {
      apiCode: 'code',
      title: 'title',
      releasedAt: '2020',
      genreList: [],
      artist: {
        id: '1',
        name: 'artist'
      },
      pictureUrl: 'http://url.com',
      isAlreadyInList: false
    };

    const trackList: TrackList = {
      totalDurationInEpochMilli: 1445,
      albumPopularityRate: 16,
      songList: [
        {
          title: 'title',
          apiCode: 'code',
          duration: 124,
          rank: 12,
          trackNumber: 1,
          preview: 'http://preview.com',
          artist: {
            id: '1',
            name: 'Artist'
          }
        }
      ]
    }
    const getByApiCodeSpy = mockAlbumSearchService.readByApiCode.and.returnValue(of(albumDetail));
    const getTrackListSpy = mockAlbumSearchService.getTrackListByApiCode.and.returnValue(of(trackList));
    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const isAlreadyInListElement: DebugElement = element.query(By.css('.music__already__in__list'));
    const addToListButton: DebugElement = element.query(By.css('.music__add__button'));

    expect(getByApiCodeSpy).toHaveBeenCalled();
    expect(getTrackListSpy).toHaveBeenCalled();
    expect(isAlreadyInListElement).toBeNull();
    expect(addToListButton).toBeTruthy();



  });

  it('should display already in list element if music is not in list', () => {

    activatedRoute.snapshot.params = { apicode: 'test' };

    const albumDetail: AlbumDetails = {
      apiCode: 'code',
      title: 'title',
      releasedAt: '2020',
      genreList: [],
      artist: {
        id: '1',
        name: 'artist'
      },
      pictureUrl: 'http://url.com',
      isAlreadyInList: true
    };

    const trackList: TrackList = {
      totalDurationInEpochMilli: 1445,
      albumPopularityRate: 16,
      songList: [
        {
          title: 'title',
          apiCode: 'code',
          duration: 124,
          rank: 12,
          trackNumber: 1,
          preview: 'http://preview.com',
          artist: {
            id: '1',
            name: 'Artist'
          }
        }
      ]
    }

    const getByApiCodeSpy = mockAlbumSearchService.readByApiCode.and.returnValue(of(albumDetail));
    const getTrackListSpy = mockAlbumSearchService.getTrackListByApiCode.and.returnValue(of(trackList));

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const isAlreadyInListElement: HTMLParagraphElement = element.query(By.css('.music__already__in__list')).nativeElement;
    const addToListButton: DebugElement = element.query(By.css('.music__add__button'));

    expect(getByApiCodeSpy).toHaveBeenCalled();
    expect(getTrackListSpy).toHaveBeenCalled();
    expect(addToListButton).toBeNull();
    expect(isAlreadyInListElement).toBeTruthy();

  });

  it('should redirect to /me if there is no api code in url', () => {

    const navigateSpy = spyOn(router, 'navigate');

    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/me']);

  });

  it('should call add to list service and change isAlreadyInList property to true when click on add to list button', () => {

    const albumDetail: AlbumDetails = {
      apiCode: 'code',
      title: 'title',
      releasedAt: '2020',
      genreList: [],
      artist: {
        id: '1',
        name: 'artist'
      },
      pictureUrl: 'http://url.com',
      isAlreadyInList: false
    };

    const trackList: TrackList = {
      totalDurationInEpochMilli: 1445,
      albumPopularityRate: 16,
      songList: [
        {
          title: 'title',
          apiCode: 'code',
          duration: 124,
          rank: 12,
          trackNumber: 1,
          preview: 'http://preview.com',
          artist: {
            id: '1',
            name: 'Artist'
          }
        }
      ]
    }

    const musicListItem: MusicListItem = {
      id: 1,
      musicId: 1,
      appUserId: 1,
      addedAt: new Date(),
      sortingOrder: 1,
      musicDetail: undefined
    };

    const addToListSpy = mockMusicListService.add.and.returnValue(of(musicListItem));

    component.albumDetail$ = of(albumDetail);
    component.trackList$ = of(trackList);

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const addToListButton: HTMLButtonElement = element.query(By.css('.music__add__button')).nativeElement;

    addToListButton.click();

    expect(addToListSpy).toHaveBeenCalled();

    component.albumDetail$.subscribe(music => {
      expect(music.isAlreadyInList).toBeTrue()
    });

  });

  it('should call add to list service and put isAlreadyInList to false when click on add to list button and api error', () => {

    const albumDetail: AlbumDetails = {
      apiCode: 'code',
      title: 'title',
      releasedAt: '2020',
      genreList: [],
      artist: {
        id: '1',
        name: 'artist'
      },
      pictureUrl: 'http://url.com',
      isAlreadyInList: false
    };

    const trackList: TrackList = {
      totalDurationInEpochMilli: 1445,
      albumPopularityRate: 16,
      songList: [
        {
          title: 'title',
          apiCode: 'code',
          duration: 124,
          rank: 12,
          trackNumber: 1,
          preview: 'http://preview.com',
          artist: {
            id: '1',
            name: 'Artist'
          }
        }
      ]
    }

    const addToListSpy = mockMusicListService.add.and.returnValue(throwError(() => 'error'));

    component.albumDetail$ = of(albumDetail);
    component.trackList$ = of(trackList);
    fixture.detectChanges();

    component.albumDetail$.subscribe(test=>console.log(test))
    const element: DebugElement = fixture.debugElement;
    const addToListButton: HTMLButtonElement = element.query(By.css('.music__add__button')).nativeElement;

    addToListButton.click();

    expect(addToListSpy).toHaveBeenCalled();

    component.albumDetail$.subscribe(music => {
      expect(music.isAlreadyInList).toBeFalse()
    });

  });

});
