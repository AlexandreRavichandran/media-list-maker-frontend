import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumDetailShowComponent } from './album-detail-show.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumSearchService } from 'src/app/shared/services/music-search/album/album-search.service';
import { SearchModule } from '../../search.module';
import { AppModule } from 'src/app/app.module';
import { AlbumDetails } from 'src/app/shared/models/music/search/album/album-details';
import { of, throwError } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TrackList } from 'src/app/shared/models/music/search/album/track-list';
import { MusicListItem } from 'src/app/shared/models/list/music/music-list-item';
import { MusicListService } from 'src/app/shared/services/list/music/music-list.service';
import { SharedModule } from 'src/app/shared/shared.module';

describe('Testing Album detail show component', () => {

  let component: AlbumDetailShowComponent;
  let fixture: ComponentFixture<AlbumDetailShowComponent>;
  let mockAlbumSearchService: jasmine.SpyObj<AlbumSearchService>;
  let mockMusicListService: jasmine.SpyObj<MusicListService>;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  beforeEach(async () => {

    mockAlbumSearchService = jasmine.createSpyObj('AlbumSearchService', ['readByApiCode', 'getTrackListByApiCode']);
    mockMusicListService = jasmine.createSpyObj('MusicListService', ['add', 'isAlreadyInAppuserMusicList']);

    await TestBed.configureTestingModule({
      declarations: [AlbumDetailShowComponent],
      imports: [AppModule, SearchModule, SharedModule],
      providers: [
        {
          provide: AlbumSearchService,
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
        apiCode: '1',
        name: 'artist',
        pictureUrl: 'https://picture.com'
      },
      pictureUrl: 'http://url.com'
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
            apiCode: '1',
            name: 'Artist',
            pictureUrl: 'https://picture.com'
          }
        }
      ]
    }
    const getByApiCodeSpy = mockAlbumSearchService.readByApiCode.and.returnValue(of(albumDetail));
    const getTrackListSpy = mockAlbumSearchService.getTrackListByApiCode.and.returnValue(of(trackList));
    const getIsAlreadyInAppUserList = mockMusicListService.isAlreadyInAppuserMusicList.and.returnValue(of(false));

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const isAlreadyInListElement: DebugElement = element.query(By.css('.music__already__in__list'));
    const addToListButton: DebugElement = element.query(By.css('.music__add__button'));

    expect(getByApiCodeSpy).toHaveBeenCalled();
    expect(getTrackListSpy).toHaveBeenCalled();
    expect(getIsAlreadyInAppUserList).toHaveBeenCalled();
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
        apiCode: '1',
        name: 'artist',
        pictureUrl: 'https://picture.com'
      },
      pictureUrl: 'http://url.com'
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
            apiCode: '1',
            name: 'Artist',
            pictureUrl: 'https://picture.com'
          }
        }
      ]
    }

    const getByApiCodeSpy = mockAlbumSearchService.readByApiCode.and.returnValue(of(albumDetail));
    const getTrackListSpy = mockAlbumSearchService.getTrackListByApiCode.and.returnValue(of(trackList));
    const getIsAlreadyInAppUserList = mockMusicListService.isAlreadyInAppuserMusicList.and.returnValue(of(true));

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const isAlreadyInListElement: HTMLParagraphElement = element.query(By.css('.music__already__in__list')).nativeElement;
    const addToListButton: DebugElement = element.query(By.css('.music__add__button'));

    expect(getByApiCodeSpy).toHaveBeenCalled();
    expect(getTrackListSpy).toHaveBeenCalled();
    expect(getIsAlreadyInAppUserList).toHaveBeenCalled();
    expect(addToListButton).toBeNull();
    expect(isAlreadyInListElement).toBeTruthy();

  });

  it('should redirect to /me if there is no api code in url', () => {

    const navigateSpy = spyOn(router, 'navigate');

    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/me']);

  });

  it('should call add to list service and change isAlreadyInList property to true when click on add to list button', () => {

    sessionStorage.setItem("token", "testtoken");

    const albumDetail: AlbumDetails = {
      apiCode: 'code',
      title: 'title',
      releasedAt: '2020',
      genreList: [],
      artist: {
        apiCode: '1',
        name: 'artist',
        pictureUrl: 'https://picture.com'
      },
      pictureUrl: 'http://url.com'
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
            apiCode: '1',
            name: 'Artist',
            pictureUrl: 'https://picture.com'
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
    component.isAlreadyInList$ = of(false);

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const addToListButton: HTMLButtonElement = element.query(By.css('.music__add__button')).nativeElement;

    addToListButton.click();

    expect(addToListSpy).toHaveBeenCalled();

    sessionStorage.clear();

  });

  it('should call add to list service and put isAlreadyInList to false when click on add to list button and api error', () => {

    sessionStorage.setItem("token", "testtoken");

    const albumDetail: AlbumDetails = {
      apiCode: 'code',
      title: 'title',
      releasedAt: '2020',
      genreList: [],
      artist: {
        apiCode: '1',
        name: 'artist',
        pictureUrl: 'https://picture.com'
      },
      pictureUrl: 'http://url.com'
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
            apiCode: '1',
            name: 'Artist',
            pictureUrl: 'https://picture.com'
          }
        }
      ]
    }

    const addToListSpy = mockMusicListService.add.and.returnValue(throwError(() => 'error'));

    component.albumDetail$ = of(albumDetail);
    component.trackList$ = of(trackList);
    component.isAlreadyInList$ = of(false);
    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const addToListButton: HTMLButtonElement = element.query(By.css('.music__add__button')).nativeElement;

    addToListButton.click();

    expect(addToListSpy).toHaveBeenCalled();

    sessionStorage.clear();

  });

});
