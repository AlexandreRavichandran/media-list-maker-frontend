import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailShowComponent } from './movie-detail-show.component';
import { MovieSearchService } from 'src/app/shared/services/movie-search/movie-search.service';
import { SearchModule } from '../../search.module';
import { AppModule } from 'src/app/app.module';
import { MovieDetails } from 'src/app/shared/models/movie/search/movie-details';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('Testing Movie detail show component', () => {

  let component: MovieDetailShowComponent;
  let fixture: ComponentFixture<MovieDetailShowComponent>;
  let mockMovieSearchService: jasmine.SpyObj<MovieSearchService>;

  beforeEach(async () => {

    mockMovieSearchService = jasmine.createSpyObj('MockSearchService', ['getByApiCode']);

    await TestBed.configureTestingModule({
      declarations: [MovieDetailShowComponent],
      imports: [AppModule, SearchModule],
      providers: [
        {
          provide: MovieSearchService,
          useValue: mockMovieSearchService
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ apicode: "test" })
            }
          }
        }],
      teardown: { destroyAfterEach: false }
    })
      .compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(MovieDetailShowComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('should display add to list button if movie is not in list', () => {

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
      pictureUrl: 'http://url.com',
      isAlreadyInList: false
    };

    const getByApiCodeSpy = mockMovieSearchService.getByApiCode.and.returnValue(of(movieDetail));

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const isAlreadyInListElement: DebugElement = element.query(By.css('.movie__already__in__list'));
    const addToListButton: DebugElement = element.query(By.css('.movie__add__button'));

    expect(getByApiCodeSpy).toHaveBeenCalled();
    expect(isAlreadyInListElement).toBeNull();
    expect(addToListButton).toBeTruthy();



  });

  it('should display already in list element if movie is not in list', () => {

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
      pictureUrl: 'http://url.com',
      isAlreadyInList: true
    };

    const getByApiCodeSpy = mockMovieSearchService.getByApiCode.and.returnValue(of(movieDetail));

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const isAlreadyInListElement: HTMLParagraphElement = element.query(By.css('.movie__already__in__list')).nativeElement;
    const addToListButton: DebugElement = element.query(By.css('.movie__add__button'));

    expect(getByApiCodeSpy).toHaveBeenCalled();
    expect(addToListButton).toBeNull();
    expect(isAlreadyInListElement).toBeTruthy();

  });

});
