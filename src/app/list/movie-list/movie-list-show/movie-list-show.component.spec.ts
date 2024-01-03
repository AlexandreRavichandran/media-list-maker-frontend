import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListShowComponent } from './movie-list-show.component';
import { ListModule } from '../../list.module';
import { AppModule } from 'src/app/app.module';
import { MovieListItem } from 'src/app/shared/models/list/movie/movie-list-item';
import { MovieListService } from 'src/app/shared/services/list/movie/movie-list.service';
import { of } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

describe('Testing movie list show component', () => {

  let component: MovieListShowComponent;
  let fixture: ComponentFixture<MovieListShowComponent>;
  let mockMovieListService: jasmine.SpyObj<MovieListService>;

  beforeEach(async () => {

    mockMovieListService = jasmine.createSpyObj('MovieListService', ['browse', 'editSortingOrder']);

    await TestBed.configureTestingModule({
      declarations: [MovieListShowComponent],
      imports: [ListModule, AppModule],
      providers: [
        {
          provide: MovieListService,
          useValue: mockMovieListService
        }
      ]
    })
      .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call browse movie list when on refresh event', () => {

    const movieList: MovieListItem[] = [
      {
        id: 1,
        movieId: 1,
        appUserId: 1,
        addedAt: new Date(),
        movieDetail: undefined,
        sortingOrder: 1
      }
    ]

    const browseSpy = mockMovieListService.browse.and.returnValue(of(movieList));

    component.onRefreshList();

    expect(browseSpy).toHaveBeenCalled();

  });

  it('should update order when drag and drop an item on user movie list', () => {

    const movieList: MovieListItem[] = [
      {
        id: 1,
        movieId: 1,
        appUserId: 1,
        addedAt: new Date(),
        movieDetail: undefined,
        sortingOrder: 1
      },
      {
        id: 2,
        movieId: 2,
        appUserId: 1,
        addedAt: new Date(),
        movieDetail: undefined,
        sortingOrder: 2
      }
    ]

    const dragNdropEvent = {
      currentIndex: 0,
      previousIndex: 1,
      container: {
        data: [
          {
            id: 1,
            movieId: 1,
            appUserId: 1,
            addedAt: new Date(),
            movieDetail: undefined,
            sortingOrder: 1
          },
          {
            id: 2,
            movieId: 2,
            appUserId: 1,
            addedAt: new Date(),
            movieDetail: undefined,
            sortingOrder: 2
          }
        ]
      }
    }

    const browseSpy = mockMovieListService.editSortingOrder.and.returnValue(of(movieList));

    component.onItemDragnDropped(dragNdropEvent as CdkDragDrop<MovieListItem[]>);

    expect(browseSpy).toHaveBeenCalled();

  });

});