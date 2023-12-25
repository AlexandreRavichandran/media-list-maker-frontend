import { TestBed } from '@angular/core/testing';

import { MusicService } from './music.service';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Music } from '../../models/music/music';

describe('Testing Music service', () => {

  let service: MusicService;
  let environmentUrl: string = environment.apiUrl;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MusicService]
    });

    service = TestBed.inject(MusicService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {

    httpTestingController.verify();

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return music list by ids', () => {

    const datas: Music[] = [
      {
        id: 1,
        artistName: 'Artist 1',
        type: 1,
        title: 'Music 1',
        apiCode: 'XXX1',
        pictureUrl: 'http://linkurl.jpg',
        releasedAt: 2001
      },
      {
        id: 2,
        artistName: 'Artist 1',
        type: 1,
        title: 'Movie 2',
        apiCode: 'XXX2',
        pictureUrl: 'http://linkurl.jpg',
        releasedAt: 2000
      },
    ];

    service.browseByIds([1, 2])
      .subscribe(datas => {
        expect(datas).toEqual(datas);
      })

    const request = httpTestingController.expectOne(environmentUrl + '/musics?musicIds=1&musicIds=2');

    expect(request.request.method).toEqual('GET');
    expect(request.request.params.getAll('musicIds')).toEqual(['1', '2']);

    request.flush(datas);

  });

  it('should return music list by type', () => {

    const datas: Music[] = [
      {
        id: 1,
        artistName: 'Artist 1',
        type: 1,
        title: 'Music 1',
        apiCode: 'XXX1',
        pictureUrl: 'http://linkurl.jpg',
        releasedAt: 2001
      },
      {
        id: 2,
        artistName: 'Artist 1',
        type: 1,
        title: 'Movie 2',
        apiCode: 'XXX2',
        pictureUrl: 'http://linkurl.jpg',
        releasedAt: 2000
      },
    ];

    service.browseByType(1)
      .subscribe(datas => {
        expect(datas).toEqual(datas);
      })

    const request = httpTestingController.expectOne(environmentUrl + '/musics/types/1');

    expect(request.request.method).toEqual('GET');

    request.flush(datas);

  });

  it('should return music by api code', () => {

    const data: Music =
    {
      id: 1,
      artistName: 'Artist 1',
      type: 1,
      title: 'Music 1',
      apiCode: 'XXX1',
      pictureUrl: 'http://linkurl.jpg',
      releasedAt: 2001
    };

    service.readByApiCode('XXX1')
      .subscribe(datas => {
        expect(datas).toEqual(data);
      })

    const request = httpTestingController.expectOne(environmentUrl + '/musics/apicodes/XXX1');

    expect(request.request.method).toEqual('GET');

    request.flush(data);

  });

  it('should return music by id', () => {

    const data: Music =
    {
      id: 1,
      artistName: 'Artist 1',
      type: 1,
      title: 'Music 1',
      apiCode: 'XXX1',
      pictureUrl: 'http://linkurl.jpg',
      releasedAt: 2001
    };

    service.readById(1)
      .subscribe(datas => {
        expect(datas).toEqual(data);
      })

    const request = httpTestingController.expectOne(environmentUrl + '/musics/1');

    expect(request.request.method).toEqual('GET');

    request.flush(data);

  });

});
