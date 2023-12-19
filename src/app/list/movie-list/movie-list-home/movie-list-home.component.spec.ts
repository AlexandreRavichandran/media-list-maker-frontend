import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { MovieListHomeComponent } from './movie-list-home.component';
import { MovieListService } from 'src/app/shared/services/list/movie/movie-list.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { AppModule } from 'src/app/app.module';
import { MovieListItem } from 'src/app/shared/models/list/movie/movie-list-item';

describe('Testing movie list home component', () => {

  let component: MovieListHomeComponent;
  let fixture: ComponentFixture<MovieListHomeComponent>;
  let mockMovieListService: jasmine.SpyObj<MovieListService>;

  beforeEach(async () => {

    mockMovieListService = jasmine.createSpyObj('MovieListService', ['browseLatest']);
    await TestBed.configureTestingModule({
      declarations: [MovieListHomeComponent],
      imports: [AppModule],
      providers: [{ provide: MovieListService, useValue: mockMovieListService }]
    })
      .compileComponents();

  });

  beforeEach(() => {

    fixture = TestBed.createComponent(MovieListHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user latest movie list', () => {

    const datas: MovieListItem[] = [
      {
        id: 1,
        movieId: 1,
        appUserId: 1,
        addedAt: new Date(),
        sortingNumber: 1,
        movieDetail: undefined
      },
      {
        id: 2,
        movieId: 1,
        appUserId: 1,
        addedAt: new Date(),
        sortingNumber: 2,
        movieDetail: undefined
      },
      {
        id: 3,
        movieId: 1,
        appUserId: 1,
        addedAt: new Date(),
        sortingNumber: 3,
        movieDetail: undefined
      }
    ];

    component.userMovieList$ = of(datas);

    fixture.detectChanges();

    const movieSection: DebugElement = fixture.nativeElement.querySelector('.list__movies__section');
    const movieItems: DebugElement[] = fixture.nativeElement.querySelectorAll('.movie__item');
    const emptyMovieSection: DebugElement = fixture.nativeElement.querySelector('.list__movie__empty__section');


    expect(movieSection).toBeTruthy();
    expect(emptyMovieSection).toBeNull();
    expect(movieItems.length).toEqual(datas.length);

  });

  it('should display empty movie list section if latest movie list is empty', fakeAsync(() => {

    component.userMovieList$ = of([]);

    fixture.detectChanges();

    const movieSection: DebugElement = fixture.nativeElement.querySelector('.list__movies__section');
    const emptyMovieSection: DebugElement = fixture.nativeElement.querySelector('.list__movie__empty__section');

    expect(movieSection).toBeNull();
    expect(emptyMovieSection).toBeTruthy();

  }))

});
