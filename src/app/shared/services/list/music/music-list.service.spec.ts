import { TestBed } from '@angular/core/testing';

import { MusicListService } from './music-list.service';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MusicListItem } from 'src/app/shared/models/list/music-list-item';

describe('Testing Music List service', () => {

  let service: MusicListService;
  let environmentUrl: string = environment.apiUrl;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MusicListService]
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

    service.browseLatest()
      .subscribe(datas => {
        expect(datas).toEqual(datas)
      });

    const request = httpTestingController.expectOne(environmentUrl + '/lists/musics/latest');

    expect(request.request.method).toEqual('GET');

    request.flush(datas);

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
