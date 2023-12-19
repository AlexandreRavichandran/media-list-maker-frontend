import { TestBed } from '@angular/core/testing';

import { MusicListService } from './music-list.service';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MusicListItem } from 'src/app/shared/models/list/music/music-list-item';
import { MusicService } from '../../music/music.service';
import { Music } from 'src/app/shared/models/music/music';
import { of } from 'rxjs';

describe('Testing Music List service', () => {

  let service: MusicListService;
  let environmentUrl: string = environment.apiUrl;
  let httpTestingController: HttpTestingController;
  let mockMusicService: jasmine.SpyObj<MusicService>;

  beforeEach(() => {

    mockMusicService = jasmine.createSpyObj('MusicService', ['browseByIds']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MusicListService, { provide: MusicService, useValue: mockMusicService }]
    });

    service = TestBed.inject(MusicListService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {

    httpTestingController.verify();

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user music list', () => {

    const datas: MusicListItem[] = [
      {
        id: 1,
        musicId: 1,
        appUserId: 1,
        addedAt: new Date(),
        sortingNumber: 1
      },
      {
        id: 2,
        musicId: 2,
        appUserId: 1,
        addedAt: new Date(),
        sortingNumber: 2
      },
      {
        id: 3,
        musicId: 3,
        appUserId: 1,
        addedAt: new Date(),
        sortingNumber: 3
      }
    ];

    service.browse()
      .subscribe(datas => {
        expect(datas).toEqual(datas);
      });

    const request = httpTestingController.expectOne(environmentUrl + '/lists/musics');

    expect(request.request.method).toEqual('GET');

    request.flush(datas);

  });

  it('should return user latest added music list', () => {

    const datas: MusicListItem[] = [
      {
        id: 1,
        musicId: 1,
        appUserId: 1,
        addedAt: new Date(),
        sortingNumber: 1
      },
      {
        id: 2,
        musicId: 1,
        appUserId: 1,
        addedAt: new Date(),
        sortingNumber: 2
      },
      {
        id: 3,
        musicId: 1,
        appUserId: 1,
        addedAt: new Date(),
        sortingNumber: 3
      }
    ];

    const mockMusicList: Music[] = [
      {
        id: 1,
        type: 1,
        artistName: "Artist",
        title: "title 1",
        apiCode: "apicode",
        pictureUrl: "http://picture.com",
        releasedAt: 2001
      },
      {
        id: 2,
        type: 1,
        artistName: "Artist",
        title: "title 2",
        apiCode: "apicode",
        pictureUrl: "http://picture.com",
        releasedAt: 2001
      },
      {
        id: 3,
        type: 1,
        artistName: "Artist",
        title: "title 3",
        apiCode: "apicode",
        pictureUrl: "http://picture.com",
        releasedAt: 2001
      }
    ];

    const musicSpy = mockMusicService.browseByIds.and.returnValue(of(mockMusicList));

    service.browseLatest()
      .subscribe(datas => {
        expect(datas).toEqual(datas)
      });

    const request = httpTestingController.expectOne(environmentUrl + '/lists/musics/latest');

    expect(request.request.method).toEqual('GET');

    request.flush(datas);

    expect(musicSpy).toHaveBeenCalled();

  });

  it('should return empty array if no user latest added music list', () => {

    const datas: MusicListItem[] = [];

    service.browseLatest()
      .subscribe(datas => {
        expect(datas).toEqual(datas)
      });

    const musicSpy = mockMusicService.browseByIds.and.returnValue(of([]));

    const request = httpTestingController.expectOne(environmentUrl + '/lists/musics/latest');

    expect(request.request.method).toEqual('GET');

    request.flush(datas);

    expect(musicSpy).toHaveBeenCalledTimes(0);

  });

  it('should add movie list item in list', () => {

    const data: MusicListItem = {
      id: 1,
      musicId: 1,
      appUserId: 1,
      addedAt: new Date(),
      sortingNumber: 1
    };

    service.add('XXX1')
      .subscribe(data => {
        expect(data).toEqual(data);
      });

    const request = httpTestingController.expectOne(environmentUrl + '/lists/musics');

    expect(request.request.method).toEqual('POST');

    request.flush(data);

  });

  it('should delete movie in list by id', () => {

    const data: MusicListItem = {
      id: 1,
      musicId: 1,
      appUserId: 1,
      addedAt: new Date(),
      sortingNumber: 1
    };

    service.deleteById(1)
      .subscribe(data => {
        expect(data).toEqual(data);
      });

    const request = httpTestingController.expectOne(environmentUrl + '/lists/musics/1');

    expect(request.request.method).toEqual('DELETE');

    request.flush(data);

  });

});
