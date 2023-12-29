import { TestBed } from '@angular/core/testing';

import { SongService } from './song.service';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SongSearchList } from 'src/app/shared/models/music/search/song/song-search-list';
import { SongDetails } from 'src/app/shared/models/music/search/song/song-details';

describe('Testing Song search service', () => {

  let service: SongService;
  let environmentUrl: string = environment.apiUrl;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SongService]
    });
    service = TestBed.inject(SongService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return song search list by name', () => {

    const datas: SongSearchList = {
      data: [
        {
          id: 'XXX1',
          title: 'Song 1',
          duration: "120",
          preview: 'preview',
          artist: {
            apiCode: 'YY1',
            name: 'Artist 1',
            pictureUrl: 'https://picture.com'
          }
        },
        {
          id: 'XXX2',
          title: 'Song 2',
          duration: "120",
          preview: 'preview',
          artist: {
            apiCode: 'YY1',
            name: 'Artist 1',
            pictureUrl: 'https://picture.com'
          }
        },
      ]
    };

    service.browseBySongName('test')
      .subscribe(datas => {
        expect(datas).toEqual(datas);
      })

    const request = httpTestingController.expectOne(environmentUrl + '/musics/deezerapi/songs?name=test');

    expect(request.request.method).toEqual('GET');

    request.flush(datas);

  });

  it('should return song search by api code', () => {

    const datas: SongDetails = {
      apiCode: 'XXX1',
      title: 'Album 1',
      duration: 120,
      rank: 231,
      trackNumber: 1,
      preview: 'preview',
      artist: {
        apiCode: 'YY1',
        name: 'Artist 1',
        pictureUrl: 'https://picture.com'
      }

    };

    service.readByApiCode('XXX1')
      .subscribe(datas => {
        expect(datas).toEqual(datas);
      })

    const request = httpTestingController.expectOne(environmentUrl + '/musics/deezerapi/songs/apicodes/XXX1');

    expect(request.request.method).toEqual('GET');

    request.flush(datas);

  });

});
