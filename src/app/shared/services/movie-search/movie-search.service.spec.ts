import { TestBed } from '@angular/core/testing';

import { MovieSearchService } from './movie-search.service';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieSearchList } from '../../models/movie/search/movie-search-list';
import { MovieDetails } from '../../models/movie/search/movie-details';

describe('Testing Movie search service', () => {

  let service: MovieSearchService;
  let environmentUrl: string = environment.apiUrl;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieSearchService]
    });

    service = TestBed.inject(MovieSearchService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {

    httpTestingController.verify();

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return movie search list by name', () => {

    const datas: MovieSearchList = {
      totalResults: 2,
      responseStatus: 200,
      movieElementList: [
        {
          title: 'Movie 1',
          apiCode: 'XXX1',
          pictureUrl: 'http://linkurl.jpg',
          releasedAt: 2001
        },
        {
          title: 'Movie 2',
          apiCode: 'XXX2',
          pictureUrl: 'http://linkurl.jpg',
          releasedAt: 2000
        },
      ]
    };

    service.getByMovieName('test')
      .subscribe(datas => {
        expect(datas).toEqual(datas);
      })

    const request = httpTestingController.expectOne(environmentUrl + '/movies/omdbapi/names/test');

    expect(request.request.method).toEqual('GET');

    request.flush(datas);

  });

  it('should return movie search by api code', () => {

    const datas: MovieDetails = {
      title: 'Movie 1',
      apiCode: 'XXX1',
      pictureUrl: 'http://linkurl.jpg',
      releasedAt: 2001,
      director: 'Director name',
      duration: '185 min',
      genreList: ['Action', 'Adventure'],
      mainActors: 'Actor 1',
      isAlreadyInList: false,
      ratings: [
        {
          source: 'ImDB',
          value: '83%'
        }
      ],
      synopsis: 'synopsis'
    };

    service.getByApiCode('XXX1')
      .subscribe(datas => {
        expect(datas).toEqual(datas);
      })

    const request = httpTestingController.expectOne(environmentUrl + '/movies/omdbapi/apicodes/XXX1');

    expect(request.request.method).toEqual('GET');

    request.flush(datas);

  });

});
