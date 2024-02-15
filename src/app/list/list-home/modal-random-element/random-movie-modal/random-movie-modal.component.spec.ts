import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomMovieModalComponent } from './random-movie-modal.component';
import { ListModule } from 'src/app/list/list.module';
import { MovieService } from 'src/app/shared/services/movie/movie.service';
import { MovieListService } from 'src/app/shared/services/list/movie/movie-list.service';
import { Movie } from 'src/app/shared/models/movie/movie';
import { of } from 'rxjs';
import { MovieListItem } from 'src/app/shared/models/list/movie/movie-list-item';
import { AppModule } from 'src/app/app.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Testing random movie modal component', () => {
  let component: RandomMovieModalComponent;
  let fixture: ComponentFixture<RandomMovieModalComponent>;
  let mockMovieService: jasmine.SpyObj<MovieService>;
  let mockMovieListService: jasmine.SpyObj<MovieListService>;
  let movieListMock: any;
  let movieMock: any;

  beforeEach(async () => {

    mockMovieService = jasmine.createSpyObj('MovieService', ['readById']);
    mockMovieListService = jasmine.createSpyObj('MovieListService', ['getRandom']);

    await TestBed.configureTestingModule({
      declarations: [RandomMovieModalComponent],
      imports: [ListModule, BrowserAnimationsModule],
      providers: [
        { provide: MovieService, useValue: mockMovieService },
        { provide: MovieListService, useValue: mockMovieListService }
      ],
    })
      .compileComponents();

    const movieList: MovieListItem = {
      id: 1,
      movieId: 2,
      addedAt: new Date(),
      appUserId: 1,
      sortingOrder: 1,
      movieDetail: undefined
    }

    const movie: Movie = {
      id: 1,
      apiCode: '001',
      pictureUrl: 'http://www.google.com',
      releasedAt: 2011,
      title: 'Movie 1'
    }

    movieListMock = mockMovieListService.getRandom.and.returnValue(of(movieList));

    movieMock = mockMovieService.readById.and.returnValue(of(movie));

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomMovieModalComponent);
    component = fixture.componentInstance;


    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get random movie when click on button', () => {

    component.generateNewRandomElement();

    expect(movieListMock).toHaveBeenCalled();
    expect(movieMock).toHaveBeenCalled();

  });

});
