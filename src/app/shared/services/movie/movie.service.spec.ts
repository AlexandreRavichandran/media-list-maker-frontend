import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { Movie } from '../../models/movie/movie';
import { environment } from 'src/environments/environment';

describe('Testing Movie service', () => {

  let service: MovieService;
  let environmentUrl: string = environment.apiUrl;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });

    service = TestBed.inject(MovieService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {

    httpTestingController.verify();

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return movie list by ids', () => {

    const datas: Movie[] = [
      {
        id: 1,
        title: 'Movie 1',
        apiCode: 'XXX1',
        pictureUrl: 'http://linkurl.jpg',
        releasedAt: 2001
      },
      {
        id: 2,
        title: 'Movie 2',
        apiCode: 'XXX2',
        pictureUrl: 'http://linkurl.jpg',
        releasedAt: 2000
      },
    ];

    service.browseByIds([1, 2])
      .subscribe(datas => {
        expect(datas).toEqual(datas);
      });

    const request = httpTestingController.expectOne(environmentUrl + '/movies?movieIds=1&movieIds=2');

    expect(request.request.method).toEqual('GET');
    expect(request.request.params.getAll('movieIds')).toEqual(['1', '2']);

    request.flush(datas);

  });

  it('should return movie by api code', () => {

    const data: Movie =
    {
      id: 1,
      title: 'Movie 1',
      apiCode: 'XXX1',
      pictureUrl: 'http://linkurl.jpg',
      releasedAt: 2000
    };

    service.readByApiCode('XXX1')
      .subscribe(datas => {
        expect(datas).toEqual(data);
      });

    const request = httpTestingController.expectOne(environmentUrl + '/movies/apicodes/XXX1');

    expect(request.request.method).toEqual('GET');

    request.flush(data);

  });

  it('should return movie by id', () => {

    const data: Movie =
    {
      id: 1,
      title: 'Movie 1',
      apiCode: 'XXX1',
      pictureUrl: 'http://linkurl.jpg',
      releasedAt: 2001
    };

    service.readById(1)
      .subscribe(datas => {
        expect(datas).toEqual(data);
      });

    const request = httpTestingController.expectOne(environmentUrl + '/movies/1');

    expect(request.request.method).toEqual('GET');

    request.flush(data);

  });

  it('should return random illustration picture url', () => {

    service
      .getRandomIllustrationPictureUrl()
      .subscribe(url => {
        expect(url).toEqual(environmentUrl + '/movies/pictures/illustrations/random')
      });


  });

});