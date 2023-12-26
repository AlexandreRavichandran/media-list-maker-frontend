import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListItemComponent } from './movie-list-item.component';
import { ListModule } from '../../list.module';
import { Router } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Testing Movie list item component', () => {

  let component: MovieListItemComponent;
  let fixture: ComponentFixture<MovieListItemComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieListItemComponent],
      imports: [ListModule, AppModule]
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
      movieDetail: undefined
    };

    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to music detail when clicking on music item', () => {

    const navigateSpy = spyOn(router, 'navigate');

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const movieItemDivElement: HTMLDivElement = element.query(By.css('.item__movie__section')).nativeElement;

    movieItemDivElement.click();

    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/search/movies/', fixture.componentInstance.movieItem.movieDetail?.apiCode]);

  });

});
