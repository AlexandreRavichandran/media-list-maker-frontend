import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultMovieComponent } from './search-result-movie.component';
import { Router } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { SearchModule } from '../../search.module';
import { MovieSearchList } from 'src/app/shared/models/movie/search/movie-search-list';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

describe('Testing search result movie component', () => {

  let component: SearchResultMovieComponent;
  let fixture: ComponentFixture<SearchResultMovieComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultMovieComponent],
      imports: [SearchModule, AppModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultMovieComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to movie detail when click on movie item', () => {

    const searchResults: MovieSearchList = {
      currentIndex: 1,
      elementsPerPage: 25,
      totalResults: 1,
      searchResults: [
        {
          apiCode: 'test',
          title: 'Title',
          releasedAt: 2001,
          pictureUrl: 'https://picture.com'
        }
      ]
    };

    component.searchResults$ = of(searchResults);

    const navigateSpy = spyOn(router, 'navigate');

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const movieElement: HTMLDivElement = element.query(By.css('.movie__element')).nativeElement;

    movieElement.click();

    expect(navigateSpy).toHaveBeenCalled();

  });

});
