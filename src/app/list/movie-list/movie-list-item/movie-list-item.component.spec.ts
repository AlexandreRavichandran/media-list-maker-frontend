import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListItemComponent } from './movie-list-item.component';
import { ListModule } from '../../list.module';
import { Router } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MovieListService } from 'src/app/shared/services/list/movie/movie-list.service';
import { MovieListItem } from 'src/app/shared/models/list/movie/movie-list-item';
import { of } from 'rxjs';

describe('Testing Movie list item component', () => {

  let component: MovieListItemComponent;
  let fixture: ComponentFixture<MovieListItemComponent>;
  let mockMovieListService: jasmine.SpyObj<MovieListService>;
  let router: Router;

  beforeEach(async () => {

    mockMovieListService = jasmine.createSpyObj('MovieListService', ['deleteById']);

    await TestBed.configureTestingModule({
      declarations: [MovieListItemComponent],
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
    fixture = TestBed.createComponent(MovieListItemComponent);
    component = fixture.componentInstance;

    fixture.componentInstance.movieItem = {
      id: 1,
      movieId: 1,
      appUserId: 1,
      addedAt: new Date(),
      sortingOrder: 1,
      movieDetail: {
        id: 1,
        title: 'title',
        apiCode: 'apicode',
        releasedAt: 2011,
        pictureUrl: 'http://picture.com'
      }
    };

    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to music detail when clicking on music item', () => {

    const navigateSpy = spyOn(router, 'navigate');

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const movieItemDivElement: HTMLDivElement = element.query(By.css('.item__movie__section .item__movie__card')).nativeElement;

    movieItemDivElement.click();

    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/search/movies/', fixture.componentInstance.movieItem.movieDetail?.apiCode]);

  });

  it('should call delete by id and emit on refresh event when clicking on delete icon', () => {

    spyOn(component.onDeleteItemEvent, 'emit');

    const deletedMovie: MovieListItem = {
      id: 1,
      movieId: 1,
      appUserId: 1,
      addedAt: new Date(),
      movieDetail: undefined,
      sortingOrder: 1
    }

    component.isDeletable = true;

    fixture.detectChanges();

    const deleteByIdSpy = mockMovieListService.deleteById.and.returnValue(of(deletedMovie));

    const element: DebugElement = fixture.debugElement;
    const deleteButton: HTMLElement = element.query(By.css('.movie__delete__button')).nativeElement;

    deleteButton.click();

    expect(deleteByIdSpy).toHaveBeenCalled();
    expect(component.onDeleteItemEvent.emit).toHaveBeenCalled();

  });

});
