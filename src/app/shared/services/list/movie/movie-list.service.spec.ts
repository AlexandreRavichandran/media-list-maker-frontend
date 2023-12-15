import { TestBed } from '@angular/core/testing';

import { MovieListService } from './movie-list.service';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieListItem } from 'src/app/shared/models/list/movie-list-item';

describe('Testing Movie List service', () => {

  let service: MovieListService;
  let environmentUrl: string = environment.apiUrl;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieListService]
    });

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
        sortingNumber: 1
      },
      {
        id: 2,
        movieId: 1,
        appUserId: 1,
        addedAt: new Date(),
        sortingNumber: 2
      },
      {
        id: 3,
        movieId: 1,
        appUserId: 1,
        addedAt: new Date(),
        sortingNumber: 3
      }
    ];

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
        sortingNumber: 1
      },
      {
        id: 2,
        movieId: 1,
        appUserId: 1,
        addedAt: new Date(),
        sortingNumber: 2
      },
      {
        id: 3,
        movieId: 1,
        appUserId: 1,
        addedAt: new Date(),
        sortingNumber: 3
      }
    ];

    service.browseLatest()
      .subscribe(datas => {
        expect(datas).toEqual(datas)
      });

    const request = httpTestingController.expectOne(environmentUrl + '/lists/movies/latest');

    expect(request.request.method).toEqual('GET');

    request.flush(datas);

  });

  it('should add movie list item in list', () => {

    const data: MovieListItem = {
      id: 1,
      movieId: 1,
      appUserId: 1,
      addedAt: new Date(),
      sortingNumber: 1
    };

    service.add('XXX1')
      .subscribe(data => {
        expect(data).toEqual(data);
      });

    const request = httpTestingController.expectOne(environmentUrl + '/lists/movies');

    expect(request.request.method).toEqual('POST');

    request.flush(data);

  });

  it('should delete movie in list by his id', () => {

    const data: MovieListItem = {
      id: 1,
      movieId: 1,
      appUserId: 1,
      addedAt: new Date(),
      sortingNumber: 1
    };

    service.deleteById(1)
      .subscribe(data => {
        expect(data).toEqual(data);
      });

    const request = httpTestingController.expectOne(environmentUrl + '/lists/movies/1');

    expect(request.request.method).toEqual('DELETE');

    request.flush(data);


  });

});
