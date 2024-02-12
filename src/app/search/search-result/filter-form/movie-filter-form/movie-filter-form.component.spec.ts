import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFilterFormComponent } from './movie-filter-form.component';
import { SearchModule } from 'src/app/search/search.module';
import { MovieSearchRequest } from 'src/app/shared/models/movie/search/movie-search-request';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SearchState } from 'src/app/search/state/search.state';
import { of } from 'rxjs';
import { SearchPageActions } from 'src/app/search/state/actions';
import { SearchTypeConstants } from 'src/app/shared/constants/search-type.constants';

describe('Testing movie filter form component', () => {
  let component: MovieFilterFormComponent;
  let fixture: ComponentFixture<MovieFilterFormComponent>;
  let store: MockStore<SearchState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieFilterFormComponent],
      imports: [
        SearchModule,
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([])
      ],
      providers: [
        provideMockStore()
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieFilterFormComponent);
    component = fixture.componentInstance;

    component.movieForm = new FormGroup({
      'year': new FormControl('2010'),
    });

    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit when clicking on apply filter button', () => {

    const spy = spyOn(store, 'dispatch');

    const selectorSpy = spyOn(store, 'select').and.returnValue(of({
      currentIndex: 0,
      query: "test",
      filter: null,
      searchElementType: 1
    }));

    const filter: MovieSearchRequest = {
      year: '2010'
    };

    const element: DebugElement = fixture.debugElement;
    const applyFilterButton: HTMLButtonElement = element.query(By.css('.apply__button')).nativeElement;

    applyFilterButton.click();

    expect(spy).toHaveBeenCalledWith(SearchPageActions.onResetPagination());
    expect(spy).toHaveBeenCalledWith(SearchPageActions.onClearSearchResults());
    expect(spy).toHaveBeenCalledWith(SearchPageActions.onSetFilterForm({ filterForm: filter }));
    expect(spy).toHaveBeenCalledWith(SearchPageActions.onSearchElementWithFilter(
      { query: "test", elementType: SearchTypeConstants.TYPE_MOVIE.value, index: 0, filter }
    ));

    expect(spy).toHaveBeenCalledTimes(4);

  });

  it('should reset filter form when clicking on reset filter button', () => {

    const element: DebugElement = fixture.debugElement;
    const resetFilterButton: HTMLButtonElement = element.query(By.css('.reset__button')).nativeElement;

    resetFilterButton.click();

    expect(component.movieForm.get('year')?.value).toBeNull();

  });


});
