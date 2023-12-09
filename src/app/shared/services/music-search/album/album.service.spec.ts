import { TestBed } from '@angular/core/testing';

import { AlbumService } from './album.service';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AlbumSearchList } from 'src/app/shared/models/music/search/album/album-search-list';
import { AlbumDetails } from 'src/app/shared/models/music/search/album/album-details';
import { TrackList } from 'src/app/shared/models/music/search/album/track-list';

describe('Testing Album search service', () => {

  let service: AlbumService;
  let environmentUrl: string = environment.apiUrl;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlbumService]
    });

    service = TestBed.inject(AlbumService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {

    httpTestingController.verify();

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return album search list by name', () => {

    const datas: AlbumSearchList = {
      data: [
        {
          id: 'XXX1',
          title: 'Album 1',
          pictureUrl: 'Picture 1',
          artist: {
            id: 'YY1',
            name: 'Artist 1'
          }
        },
        {
          id: 'XXX1',
          title: 'Album 1',
          pictureUrl: 'Picture 1',
          artist: {
            id: 'YY1',
            name: 'Artist 1'
          }
        }
      ]
    };

    service.browseByAlbumName('test')
      .subscribe(datas => {
        expect(datas).toEqual(datas);
      })

    const request = httpTestingController.expectOne(environmentUrl + '/musics/deezerapi/albums?name=test');

    expect(request.request.method).toEqual('GET');

    request.flush(datas);

  });

  it('should return album search by api code', () => {

    const datas: AlbumDetails = {
      apiCode: 'XXX1',
      title: 'Album 1',
      pictureUrl: 'Picture url',
      releaseDate: '05/12/2021',
      artist: {
        id: 'YY1',
        name: 'Artist 1'
      },
      genreList: [
        {
          id: 1,
          name: 'Genre 1'
        },
        {
          id: 2,
          name: 'Genre 2'
        }
      ],
      isAlreadyInList: false

    };

    service.readByApiCode('XXX1')
      .subscribe(datas => {
        expect(datas).toEqual(datas);
      })

    const request = httpTestingController.expectOne(environmentUrl + '/musics/deezerapi/albums/apicodes/XXX1');

    expect(request.request.method).toEqual('GET');

    request.flush(datas);

  });

  it('should return album tracklist by api code', () => {

    const datas: TrackList = {
      totalDuration: "30m",
      albumPopularityRate: 0.60,
      songList: [
        {
          title: 'Song 1',
          apiCode: 'XXX1',
          duration: 120,
          rank: 142,
          trackNumber: 1,
          preview: 'preview',
          artist: {
            id: 'YY1',
            name: 'Artist 1'
          }
        },
        {
          title: 'Song 2',
          apiCode: 'XXX2',
          duration: 120,
          rank: 141,
          trackNumber: 1,
          preview: 'preview',
          artist: {
            id: 'YY1',
            name: 'Artist 1'
          }
        },
      ]
    };

    service.getTrackListByApiCode('test')
      .subscribe(datas => {
        expect(datas).toEqual(datas);
      })

    const request = httpTestingController.expectOne(environmentUrl + '/musics/deezerapi/albums/apicodes/test/tracklist');

    expect(request.request.method).toEqual('GET');

    request.flush(datas);

  });

});
