import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumDetailShowComponent } from './album-detail-show.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from 'src/app/shared/services/music-search/album/album.service';
import { SearchModule } from '../../search.module';
import { AppModule } from 'src/app/app.module';
import { AlbumDetails } from 'src/app/shared/models/music/search/album/album-details';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TrackList } from 'src/app/shared/models/music/search/album/track-list';

describe('Testing Album detail show component', () => {

  let component: AlbumDetailShowComponent;
  let fixture: ComponentFixture<AlbumDetailShowComponent>;
  let mockAlbumSearchService: jasmine.SpyObj<AlbumService>;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  beforeEach(async () => {

    mockAlbumSearchService = jasmine.createSpyObj('AlbumSearchService', ['readByApiCode', 'getTrackListByApiCode']);

    await TestBed.configureTestingModule({
      declarations: [AlbumDetailShowComponent],
      imports: [AppModule, SearchModule],
      providers: [
        {
          provide: AlbumService,
          useValue: mockAlbumSearchService
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

  it('should display already in list element if movie is not in list', () => {

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

  it('should display add to list button if movie is not in list', () => {

    const navigateSpy = spyOn(router, 'navigate');

    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/me']);

  });

});
