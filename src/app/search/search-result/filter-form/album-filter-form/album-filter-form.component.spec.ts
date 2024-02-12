import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumFilterFormComponent } from './album-filter-form.component';
import { SearchModule } from 'src/app/search/search.module';
import { AlbumSearchRequest } from 'src/app/shared/models/music/search/album/album-search-request';
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

describe('Testing album filter form component', () => {
  let component: AlbumFilterFormComponent;
  let fixture: ComponentFixture<AlbumFilterFormComponent>;
  let store: MockStore<SearchState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlbumFilterFormComponent],
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
    fixture = TestBed.createComponent(AlbumFilterFormComponent);
    component = fixture.componentInstance;

    component.albumForm = new FormGroup({
      'artist': new FormControl('artist'),
      'label': new FormControl('label')
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
      searchElementType: 2
    }));

    const filter: AlbumSearchRequest = {
      artist: 'artist',
      label: 'label'
    };

    const element: DebugElement = fixture.debugElement;
    const applyFilterButton: HTMLButtonElement = element.query(By.css('.apply__button')).nativeElement;

    applyFilterButton.click();

    expect(spy).toHaveBeenCalledWith(SearchPageActions.onResetPagination());
    expect(spy).toHaveBeenCalledWith(SearchPageActions.onClearSearchResults());
    expect(spy).toHaveBeenCalledWith(SearchPageActions.onSetFilterForm({ filterForm: filter }));
    expect(spy).toHaveBeenCalledWith(SearchPageActions.onSearchElementWithFilter(
      { query: "test", elementType: SearchTypeConstants.TYPE_ALBUM.value, index: 0, filter }
    ));

    expect(spy).toHaveBeenCalledTimes(4);

  });

  it('should reset filter form when clicking on reset filter button', () => {

    const element: DebugElement = fixture.debugElement;
    const resetFilterButton: HTMLButtonElement = element.query(By.css('.reset__button')).nativeElement;

    resetFilterButton.click();

    expect(component.albumForm.get('artist')?.value).toBeNull();
    expect(component.albumForm.get('label')?.value).toBeNull();

  });

});
