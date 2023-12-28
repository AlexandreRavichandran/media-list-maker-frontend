import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailShowComponent } from './movie-detail-show.component';
import { MovieSearchService } from 'src/app/shared/services/movie-search/movie-search.service';
import { SearchModule } from '../../search.module';
import { AppModule } from 'src/app/app.module';
import { MovieDetails } from 'src/app/shared/models/movie/search/movie-details';
import { of, throwError } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieListService } from 'src/app/shared/services/list/movie/movie-list.service';
import { MovieListItem } from 'src/app/shared/models/list/movie/movie-list-item';

describe('Testing Movie detail show component', () => {

  let component: MovieDetailShowComponent;
  let fixture: ComponentFixture<MovieDetailShowComponent>;
  let mockMovieSearchService: jasmine.SpyObj<MovieSearchService>;
  let mockMovieListService: jasmine.SpyObj<MovieListService>;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  beforeEach(async () => {

    mockMovieSearchService = jasmine.createSpyObj('MovieSearchService', ['getByApiCode']);
    mockMovieListService = jasmine.createSpyObj('MovieListService', ['add', 'isAlreadyInAppUserMovieList']);

    await TestBed.configureTestingModule({
      declarations: [MovieDetailShowComponent],
      imports: [AppModule, SearchModule],
      providers: [
        {
          provide: MovieSearchService,
          useValue: mockMovieSearchService
        },
        {
          provide: MovieListService,
          useValue: mockMovieListService
        }],
      teardown: { destroyAfterEach: false }
    })
      .compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(MovieDetailShowComponent);
    component = fixture.componentInstance;

    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('should display add to list button if movie is not in list', () => {

    activatedRoute.snapshot.params = { 'apicode': 'test' };

    const movieDetail: MovieDetails = {
      apiCode: 'code',
      title: 'title',
      releasedAt: 2023,
      duration: 'duration',
      genreList: ['genre 1', 'genre 2'],
      mainActors: 'Actor 1',
      synopsis: 'Synopsis',
      director: 'Director',
      ratings: [{ source: 'source', value: 'value' }],
      pictureUrl: 'http://url.com'
    };

    const getByApiCodeSpy = mockMovieSearchService.getByApiCode.and.returnValue(of(movieDetail));
    const getIsAlreadyInAppUserList = mockMovieListService.isAlreadyInAppUserMovieList.and.returnValue(of(false));

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const isAlreadyInListElement: DebugElement = element.query(By.css('.movie__already__in__list'));
    const addToListButton: DebugElement = element.query(By.css('.movie__add__button'));

    expect(getByApiCodeSpy).toHaveBeenCalled();
    expect(getIsAlreadyInAppUserList).toHaveBeenCalled();
    expect(isAlreadyInListElement).toBeNull();
    expect(addToListButton).toBeTruthy();



  });

  it('should display already in list element if movie is already in list', () => {

    activatedRoute.snapshot.params = { apicode: 'test' };

    const movieDetail: MovieDetails = {
      apiCode: 'code',
      title: 'title',
      releasedAt: 2023,
      duration: 'duration',
      genreList: ['genre 1', 'genre 2'],
      mainActors: 'Actor 1',
      synopsis: 'Synopsis',
      director: 'Director',
      ratings: [{ source: 'source', value: 'value' }],
      pictureUrl: 'http://url.com'
    };

    const getByApiCodeSpy = mockMovieSearchService.getByApiCode.and.returnValue(of(movieDetail));
    const getIsAlreadyInAppUserList = mockMovieListService.isAlreadyInAppUserMovieList.and.returnValue(of(true));

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const isAlreadyInListElement: HTMLParagraphElement = element.query(By.css('.movie__already__in__list')).nativeElement;
    const addToListButton: DebugElement = element.query(By.css('.movie__add__button'));

    expect(getByApiCodeSpy).toHaveBeenCalled();
    expect(getIsAlreadyInAppUserList).toHaveBeenCalled();
    expect(addToListButton).toBeNull();
    expect(isAlreadyInListElement).toBeTruthy();

  });

  it('should redirect to /me if there is no api code in url', () => {

    const navigateSpy = spyOn(router, 'navigate');

    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/me']);

  });

  it('should call add to list service and change isAlreadyInList property to true when click on add to list button', () => {

    const movieDetail: MovieDetails = {
      apiCode: 'code',
      title: 'title',
      releasedAt: 2023,
      duration: 'duration',
      genreList: ['genre 1', 'genre 2'],
      mainActors: 'Actor 1',
      synopsis: 'Synopsis',
      director: 'Director',
      ratings: [{ source: 'source', value: 'value' }],
      pictureUrl: 'http://url.com'
    };

    const movieListItem: MovieListItem = {
      id: 1,
      movieId: 1,
      appUserId: 1,
      addedAt: new Date(),
      sortingOrder: 1,
      movieDetail: undefined
    };

    const addToListSpy = mockMovieListService.add.and.returnValue(of(movieListItem));

    component.movieDetail$ = of(movieDetail);
    component.isAlreadyInList$ = of(false);

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const addToListButton: HTMLButtonElement = element.query(By.css('.movie__add__button')).nativeElement;

    addToListButton.click();

    expect(addToListSpy).toHaveBeenCalled();


  });

  it('should call add to list service and put isAlreadyInList to false when click on add to list button and api error', () => {

    const movieDetail: MovieDetails = {
      apiCode: 'code',
      title: 'title',
      releasedAt: 2023,
      duration: 'duration',
      genreList: ['genre 1', 'genre 2'],
      mainActors: 'Actor 1',
      synopsis: 'Synopsis',
      director: 'Director',
      ratings: [{ source: 'source', value: 'value' }],
      pictureUrl: 'http://url.com'
    };

    const movieListItem: MovieListItem = {
      id: 1,
      movieId: 1,
      appUserId: 1,
      addedAt: new Date(),
      sortingOrder: 1,
      movieDetail: undefined
    };

    const addToListSpy = mockMovieListService.add.and.returnValue(throwError(() => 'error'));

    component.movieDetail$ = of(movieDetail);
    component.isAlreadyInList$ = of(false);

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const addToListButton: HTMLButtonElement = element.query(By.css('.movie__add__button')).nativeElement;

    addToListButton.click();

    expect(addToListSpy).toHaveBeenCalled();


  });

});
