import { TestBed } from '@angular/core/testing';

import { AlbumSearchService } from './album-search.service';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AlbumSearchList } from 'src/app/shared/models/music/search/album/album-search-list';
import { AlbumDetails } from 'src/app/shared/models/music/search/album/album-details';
import { TrackList } from 'src/app/shared/models/music/search/album/track-list';
import { FormGroup } from '@angular/forms';
import { AlbumSearchRequest } from 'src/app/shared/models/music/search/album/album-search-request';

describe('Testing Album search service', () => {

  let service: AlbumSearchService;
  let environmentUrl: string = environment.apiUrl;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlbumSearchService]
    });

    service = TestBed.inject(AlbumSearchService);
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
      currentIndex: 1,
      elementsPerPage: 6,
      searchResults: [
        {
          apiCode: 'XXX1',
          title: 'Album 1',
          pictureUrl: 'Picture 1',
          artist: {
            apiCode: 'YY1',
            name: 'Artist 1',
            pictureUrl: 'https://picture.com'
          }
        },
        {
          apiCode: 'XXX1',
          title: 'Album 1',
          pictureUrl: 'Picture 1',
          artist: {
            apiCode: 'YY1',
            name: 'Artist 1',
            pictureUrl: 'https://picture.com'
          }
        }
      ],
      totalResults: 30
    };

    service.browseByQueryAndIndex('test')
      .subscribe(datas => {
        expect(datas).toEqual(datas);
      })

    const request = httpTestingController.expectOne(environmentUrl + '/musics/deezerapi/albums?name=test');

    expect(request.request.method).toEqual('GET');

    request.flush(datas);

  });

  it('should return album search list by filter', () => {

    const datas: AlbumSearchList = {
      currentIndex: 1,
      elementsPerPage: 6,
      searchResults: [
        {
          apiCode: 'XXX1',
          title: 'Album 1',
          pictureUrl: 'Picture 1',
          artist: {
            apiCode: 'YY1',
            name: 'Artist 1',
            pictureUrl: 'https://picture.com'
          }
        },
        {
          apiCode: 'XXX1',
          title: 'Album 1',
          pictureUrl: 'Picture 1',
          artist: {
            apiCode: 'YY1',
            name: 'Artist 1',
            pictureUrl: 'https://picture.com'
          }
        }
      ],
      totalResults: 30
    };

    const filters: AlbumSearchRequest = {
      name: 'test',
      artist: 'test',
      label: 'test'
    };

    service.browseByQueryAndFilter(filters)
      .subscribe(datas => {
        expect(datas).toEqual(datas);
      })

    const request = httpTestingController.expectOne(environmentUrl + '/musics/deezerapi/albums?name=test&artist=test&label=test');

    expect(request.request.method).toEqual('GET');

    request.flush(datas);

  });

  it('should return album search by api code', () => {

    const datas: AlbumDetails = {
      apiCode: 'XXX1',
      title: 'Album 1',
      pictureUrl: 'Picture url',
      releasedAt: '05/12/2021',
      artist: {
        apiCode: 'YY1',
        name: 'Artist 1',
        pictureUrl: 'https://picture.com'
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
      ]

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
      totalDurationInEpochMilli: 30,
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
            apiCode: 'YY1',
            name: 'Artist 1',
            pictureUrl: 'https://picture.com'
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
            apiCode: 'YY1',
            name: 'Artist 1',
            pictureUrl: 'https://picture.com'
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

  it('should return album filter form group with valid fields', () => {

    const formGroup: FormGroup = service.generateFilterForm();

    expect(formGroup.contains('artist')).toBeTrue();
    expect(formGroup.contains('label')).toBeTrue();

  });

});
