import { TestBed } from '@angular/core/testing';

import { MovieListService } from './movie-list.service';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieListItem } from 'src/app/shared/models/list/movie/movie-list-item';
import { MovieService } from '../../movie/movie.service';
import { Movie } from 'src/app/shared/models/movie/movie';
import { of } from 'rxjs';

describe('Testing Movie List service', () => {

  let service: MovieListService;
  let environmentUrl: string = environment.apiUrl;
  let httpTestingController: HttpTestingController;
  let mockMovieService: jasmine.SpyObj<MovieService>;

  beforeEach(() => {

    mockMovieService = jasmine.createSpyObj('MovieService', ['browseByIds']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieListService, { provide: MovieService, useValue: mockMovieService }]
    })
      .compileComponents();

    service = TestBed.inject(MovieListService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {

    httpTestingController.verify();

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user movie list', () => {

    const datas: MovieListItem[] = [
      {
        id: 1,
        movieId: 1,
        appUserId: 1,
        addedAt: new Date(),
        sortingOrder: 1,
        movieDetail: undefined
      },
      {
        id: 2,
        movieId: 1,
        appUserId: 1,
        addedAt: new Date(),
        sortingOrder: 2,
        movieDetail: undefined
      },
      {
        id: 3,
        movieId: 1,
        appUserId: 1,
        addedAt: new Date(),
        sortingOrder: 3,
        movieDetail: undefined
      }
    ];

    const mockMovieList: Movie[] = [
      {
        id: 1,
        title: "title 1",
        apiCode: "apicode",
        pictureUrl: "http://picture.com",
        releasedAt: 2001
      },
      {
        id: 2,
        title: "title 2",
        apiCode: "apicode",
        pictureUrl: "http://picture.com",
        releasedAt: 2001
      },
      {
        id: 3,
        title: "title 3",
        apiCode: "apicode",
        pictureUrl: "http://picture.com",
        releasedAt: 2001
      }
    ];

    const movieSpy = mockMovieService.browseByIds.and.returnValue(of(mockMovieList));

    service.browse()
      .subscribe(datas => {
        expect(datas).toEqual(datas);
      });

    const request = httpTestingController.expectOne(environmentUrl + '/lists/movies');

    expect(request.request.method).toEqual('GET');

    request.flush(datas);
    expect(movieSpy).toHaveBeenCalled();

  });

  it('should return user movie list', () => {

    const datas: MovieListItem[] = [];

    service.browse()
      .subscribe(datas => {
        expect(datas).toEqual(datas);
      });

    const request = httpTestingController.expectOne(environmentUrl + '/lists/movies');

    expect(request.request.method).toEqual('GET');

    request.flush(datas);

  });

  it('should return users latest added movie list', () => {

    const datas: MovieListItem[] = [
      {
        id: 1,
        movieId: 1,
        appUserId: 1,
        addedAt: new Date(),
        sortingOrder: 1,
        movieDetail: undefined
      },
      {
        id: 2,
        movieId: 2,
        appUserId: 1,
        addedAt: new Date(),
        sortingOrder: 2,
        movieDetail: undefined
      },
      {
        id: 3,
        movieId: 3,
        appUserId: 1,
        addedAt: new Date(),
        sortingOrder: 3,
        movieDetail: undefined
      }
    ];

    const mockMovieList: Movie[] = [
      {
        id: 1,
        title: "title 1",
        apiCode: "apicode",
        pictureUrl: "http://picture.com",
        releasedAt: 2001
      },
      {
        id: 2,
        title: "title 2",
        apiCode: "apicode",
        pictureUrl: "http://picture.com",
        releasedAt: 2001
      },
      {
        id: 3,
        title: "title 3",
        apiCode: "apicode",
        pictureUrl: "http://picture.com",
        releasedAt: 2001
      }
    ];

    const movieSpy = mockMovieService.browseByIds.and.returnValue(of(mockMovieList));

    service.browseLatest()
      .subscribe(datas => {
        expect(datas).toEqual(datas)
      });

    const request = httpTestingController.expectOne(environmentUrl + '/lists/movies/latest');

    expect(request.request.method).toEqual('GET');

    request.flush(datas);

    expect(movieSpy).toHaveBeenCalled();
  });

  it('should return users latest added movie list', () => {

    const datas: MovieListItem[] = [];

    const movieSpy = mockMovieService.browseByIds.and.returnValue(of([]));

    service.browseLatest()
      .subscribe(datas => {
        expect(datas).toEqual(datas)
      });

    const request = httpTestingController.expectOne(environmentUrl + '/lists/movies/latest');

    expect(request.request.method).toEqual('GET');

    request.flush(datas);

    expect(movieSpy).toHaveBeenCalledTimes(0);
  });

  it('should add movie list item in list', () => {

    const data: MovieListItem = {
      id: 1,
      movieId: 1,
      appUserId: 1,
      addedAt: new Date(),
      sortingOrder: 1,
      movieDetail: undefined
    };

    service.add('XXX1')
      .subscribe(data => {
        expect(data).toEqual(data);
      });

    const request = httpTestingController.expectOne(environmentUrl + '/lists/movies');

    expect(request.request.method).toEqual('POST');

    request.flush(data);

  });

  it('should return if movie is already on app user list', () => {

    service.isAlreadyInAppUserMovieList('XXX1')
      .subscribe(data => {
        expect(data).toEqual(true);
      });

    const request = httpTestingController
      .expectOne(`${environmentUrl}/lists/movies/apicode/XXX1`);

    expect(request.request.method).toEqual('GET');

    request.flush(true);

  });

  it('should delete movie in list by id', () => {

    const data: MovieListItem = {
      id: 1,
      movieId: 1,
      appUserId: 1,
      addedAt: new Date(),
      sortingOrder: 1,
      movieDetail: undefined
    };

    service.deleteById(1)
      .subscribe(data => {
        expect(data).toEqual(data);
      });

    const request = httpTestingController.expectOne(environmentUrl + '/lists/movies/1');

    expect(request.request.method).toEqual('DELETE');

    request.flush(data);


  });

  it('should edit sorting order and return list of user movie', () => {

    const datas: MovieListItem[] = [
      {
        id: 1,
        movieId: 1,
        appUserId: 1,
        addedAt: new Date(),
        sortingOrder: 1,
        movieDetail: undefined
      },
      {
        id: 2,
        movieId: 1,
        appUserId: 1,
        addedAt: new Date(),
        sortingOrder: 2,
        movieDetail: undefined
      },
      {
        id: 3,
        movieId: 1,
        appUserId: 1,
        addedAt: new Date(),
        sortingOrder: 3,
        movieDetail: undefined
      }
    ];

    const mockMovieList: Movie[] = [
      {
        id: 1,
        title: "title 1",
        apiCode: "apicode",
        pictureUrl: "http://picture.com",
        releasedAt: 2001
      },
      {
        id: 2,
        title: "title 2",
        apiCode: "apicode",
        pictureUrl: "http://picture.com",
        releasedAt: 2001
      },
      {
        id: 3,
        title: "title 3",
        apiCode: "apicode",
        pictureUrl: "http://picture.com",
        releasedAt: 2001
      }
    ];

    service.editSortingOrder(1, 1)
      .subscribe(data => {
        expect(data).toEqual(data);
      });

    const movieSpy = mockMovieService.browseByIds.and.returnValue(of(mockMovieList));

    const request = httpTestingController.expectOne(environmentUrl + '/lists/movies/1');

    expect(request.request.method).toEqual('PUT');

    request.flush(datas);

  });

});
