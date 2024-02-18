import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultMovieComponent } from './search-result-movie.component';
import { Router } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { SearchModule } from '../../search.module';
import { MovieSearchList } from 'src/app/shared/models/movie/search/movie-search-list';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SearchState } from '../../state/search.state';
import { SearchPageActions } from '../../state/actions';
import { getSearchElementDatas } from '../../state/selectors/search.selectors';
import { SearchTypeConstants } from 'src/app/shared/constants/search-type.constants';

describe('Testing search result movie component', () => {

  let component: SearchResultMovieComponent;
  let fixture: ComponentFixture<SearchResultMovieComponent>;
  let store: MockStore<SearchState>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultMovieComponent],
      imports: [SearchModule, AppModule],
      providers: [
        provideMockStore()
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultMovieComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);

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

  it('should trigger action when change page', () => {

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

    fixture.detectChanges();

    const spyDispatch = spyOn(store, 'dispatch');
    const selectorSpy = spyOn(store, 'select').and.returnValue(of({
      currentIndex: 3,
      query: 'test',
      filter: null,
      searchElementType: 1
    }));

    const item = {
      nextIndex: 20,
      nextPage: 3
    }

    component.onChangePage(item);

    expect(spyDispatch).toHaveBeenCalledWith(SearchPageActions.onChangePage({ nextIndex: item.nextIndex, nextPage: item.nextPage }));
    expect(spyDispatch).toHaveBeenCalledWith(SearchPageActions.onToggleLoading());
    expect(selectorSpy).toHaveBeenCalledWith(getSearchElementDatas);
    expect(spyDispatch).toHaveBeenCalledWith(SearchPageActions.onSearchElement(
      { query: 'test', elementType: SearchTypeConstants.TYPE_MOVIE.value, index: 3 }));

  });

  it('should trigger action when get movie without filter form', () => {

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

    const spyDispatch = spyOn(store, 'dispatch');
    const selectorSpy = spyOn(store, 'select').and.returnValue(of({
      currentIndex: 3,
      query: 'test',
      filter: null,
      searchElementType: 1
    }));

    fixture.detectChanges();

    expect(spyDispatch).toHaveBeenCalledWith(SearchPageActions.onToggleLoading());
    expect(selectorSpy).toHaveBeenCalledWith(getSearchElementDatas);
    expect(spyDispatch).toHaveBeenCalledWith(SearchPageActions.onSearchElement(
      { query: 'test', elementType: SearchTypeConstants.TYPE_MOVIE.value, index: 3 }));

  });

  it('should trigger action when get movie wih filter form', () => {

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

    const spyDispatch = spyOn(store, 'dispatch');
    const selectorSpy = spyOn(store, 'select').and.returnValue(of({
      currentIndex: 3,
      query: 'test',
      filter: {
        test: 'test'
      },
      searchElementType: SearchTypeConstants.TYPE_MOVIE.value
    }));

    fixture.detectChanges();

    expect(spyDispatch).toHaveBeenCalledWith(SearchPageActions.onToggleLoading());
    expect(selectorSpy).toHaveBeenCalledWith(getSearchElementDatas);
    expect(spyDispatch).toHaveBeenCalledWith(SearchPageActions.onSearchElementWithFilter(
      { query: 'test', elementType: SearchTypeConstants.TYPE_MOVIE.value, index: 3, filter: { test: 'test' } }));

  });

  it('should return path to movie poster not found picture when picture url is N/A', () => {

    const pictureUrl = component.addGenericPictureIfPictureIsNull('N/A');

    expect(pictureUrl).toEqual('assets/movie_poster_not_found.png');

  });

  it('should return path to movie poster not found picture when picture url is not N/A', () => {

    const pictureUrl = component.addGenericPictureIfPictureIsNull('http://picture.com');

    expect(pictureUrl).toEqual('http://picture.com');

  });

});
