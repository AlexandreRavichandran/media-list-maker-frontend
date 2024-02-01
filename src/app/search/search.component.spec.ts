import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { AppModule } from '../app.module';
import { ActivatedRoute } from '@angular/router';
import { SearchModule } from './search.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SearchState } from './state/search.state';
import { SearchPageActions } from './state/actions';
import { SearchTypeConstants } from '../shared/constants/search-type.constants';

describe('Testing search component', () => {

  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let store: MockStore<SearchState>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [SearchModule, AppModule],
      providers: [
        provideMockStore()
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;

    activatedRoute = TestBed.inject(ActivatedRoute);
    store = TestBed.inject(MockStore);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply movie class if movie type is selected', () => {

    component.searchForm.get('query')?.setValue("Test");
    fixture.detectChanges();
    const element: DebugElement = fixture.debugElement;
    const searchButton: HTMLButtonElement = element.query(By.css('.search__button')).nativeElement;
    expect(searchButton.classList.contains('search__movie__button')).toBeTrue();
    expect(searchButton.classList.contains('search__music__button')).toBeFalse();
    expect(searchButton.getAttributeNames().includes('disabled')).toBeFalse();

  });

  it('should apply music class if music type is selected', () => {

    component.searchForm.get('query')?.setValue("Test");
    component.searchForm.get('type')?.setValue(SearchTypeConstants.TYPE_ALBUM_ID);

    component.onTypeChange();

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const searchButton: HTMLButtonElement = element.query(By.css('.search__button')).nativeElement;

    expect(searchButton.classList.contains('search__movie__button')).toBeFalse();
    expect(searchButton.classList.contains('search__music__button')).toBeTrue();
    expect(searchButton.getAttributeNames().includes('disabled')).toBeFalse();

  });

  it('should apply movie class if changing to movie type', () => {

    component.searchForm.get('type')?.setValue(SearchTypeConstants.TYPE_MOVIE_ID);

    fixture.detectChanges();

    component.onTypeChange();

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const searchButton: HTMLButtonElement = element.query(By.css('.search__button')).nativeElement;

    expect(searchButton.classList.contains('search__movie__button')).toBeTrue();
    expect(searchButton.classList.contains('search__music__button')).toBeFalse();

  });

  it('should apply music class if changing to music type', () => {

    component.searchForm.get('type')?.setValue(SearchTypeConstants.TYPE_ALBUM_ID);

    fixture.detectChanges();

    component.onTypeChange();

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const searchButton: HTMLButtonElement = element.query(By.css('.search__button')).nativeElement;

    expect(searchButton.classList.contains('search__movie__button')).toBeFalse();
    expect(searchButton.classList.contains('search__music__button')).toBeTrue();

  });

  it('should be disabled if form is not valid', () => {

    fixture.detectChanges();

    component.searchForm.get('query')?.setValue('');

    component.onTypeChange();

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const searchButton: HTMLButtonElement = element.query(By.css('.search__button')).nativeElement;

    expect(searchButton.getAttributeNames().includes('disabled')).toBeTrue();

  });

  it('should not apply search if form is not valid', () => {

    const spy = spyOn(store, 'dispatch');

    fixture.detectChanges();

    component.onSearch();
    expect(spy).toHaveBeenCalledWith(SearchPageActions.onSetIsSearchResultsDisplayed({ isSearchResultsDisplayed: false }));

  });

  it('should call movie search service when type is movie', () => {

    const spy = spyOn(store, 'dispatch');

    fixture.detectChanges();

    component.searchForm.get('type')?.setValue('movie');
    component.searchForm.get('query')?.setValue('test');

    fixture.detectChanges();

    component.onSearch();
    expect(spy).toHaveBeenCalledWith(SearchPageActions.onSetIsSearchResultsDisplayed({ isSearchResultsDisplayed: false }));
    expect(spy).toHaveBeenCalledWith(SearchPageActions.onSetQuery({ query: "test" }));
    expect(spy).toHaveBeenCalledWith(SearchPageActions.onSetIsSearchResultsDisplayed({ isSearchResultsDisplayed: true }));
  });

  it('should delete query when changing type', () => {

    const spy = spyOn(store, 'dispatch');

    fixture.detectChanges();

    component.onTypeChange();

    expect(spy).toHaveBeenCalledWith(SearchPageActions.onSetIsSearchResultsDisplayed({ isSearchResultsDisplayed: false }));

  });

});
