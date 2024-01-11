import { TestBed } from '@angular/core/testing';

import { ArtistService } from './artist.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { ArtistRelatedAlbum } from 'src/app/shared/models/artist/artist-related-albums';

describe('Testing artist service', () => {

  let service: ArtistService;
  let environmentUrl: string = environment.apiUrl;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArtistService]
    });
    service = TestBed.inject(ArtistService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return album tracklist by api code', () => {

    const datas: ArtistRelatedAlbum = {
      albumList: [
        {
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

        },
        {
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

        }
      ]
    };

    service.browseAlbumByArtistApiCode('test')
      .subscribe(datas => {
        expect(datas).toEqual(datas);
      })

    const request = httpTestingController.expectOne(environmentUrl + '/musics/deezerapi/artists/test/albums');

    expect(request.request.method).toEqual('GET');

    request.flush(datas);

  });

});
