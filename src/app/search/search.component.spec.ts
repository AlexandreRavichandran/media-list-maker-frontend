import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { AppModule } from '../app.module';
import { ActivatedRoute } from '@angular/router';
import { SearchModule } from './search.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MovieSearchService } from '../shared/services/movie-search/movie-search.service';
import { AlbumSearchService } from '../shared/services/music-search/album/album-search.service';
import { AlbumSearchRequest } from '../shared/models/music/search/album/album-search-request';

describe('Testing search component', () => {

  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let activatedRoute: ActivatedRoute;
  let mockMovieSearchService: jasmine.SpyObj<MovieSearchService>;
  let mockAlbumSearchService: jasmine.SpyObj<AlbumSearchService>;

  beforeEach(async () => {

    mockMovieSearchService = jasmine.createSpyObj('MovieSearchService', ['browseByQuery']);
    mockAlbumSearchService = jasmine.createSpyObj('AlbumSearchService', ['browseByQuery', 'browseByQueryAndFilter']);

    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [SearchModule, AppModule],
      providers: [
        {
          provide: MovieSearchService,
          useValue: mockMovieSearchService
        },
        {
          provide: AlbumSearchService,
          useValue: mockAlbumSearchService
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;

    activatedRoute = TestBed.inject(ActivatedRoute);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply movie class if movie type is selected', () => {

    component.searchForm.get('query')?.setValue('albumName');

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const searchButton: HTMLButtonElement = element.query(By.css('.search__button')).nativeElement;

    expect(searchButton.classList.contains('search__movie__button')).toBeTrue();
    expect(searchButton.classList.contains('search__music__button')).toBeFalse();
    expect(searchButton.getAttributeNames().includes('disabled')).toBeFalse();

  });

  it('should apply music class if music type is selected', () => {

    fixture.detectChanges();

    component.searchForm.get('type')?.setValue('album');

    component.searchForm.get('query')?.setValue('albumName');

    component.onTypeChange();

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const searchButton: HTMLButtonElement = element.query(By.css('.search__button')).nativeElement;

    expect(searchButton.classList.contains('search__movie__button')).toBeFalse();
    expect(searchButton.classList.contains('search__music__button')).toBeTrue();
    expect(searchButton.getAttributeNames().includes('disabled')).toBeFalse();

  });

  it('should apply movie class if movie type is selected', () => {

    fixture.detectChanges();

    component.searchForm.get('type')?.setValue('album');

    component.searchForm.get('query')?.setValue('albumName');

    component.onTypeChange();

    fixture.detectChanges();

    component.searchForm.get('type')?.setValue('movie');

    component.onTypeChange();

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const searchButton: HTMLButtonElement = element.query(By.css('.search__button')).nativeElement;

    expect(searchButton.classList.contains('search__music__button')).toBeFalse();
    expect(searchButton.classList.contains('search__movie__button')).toBeTrue();
    expect(searchButton.getAttributeNames().includes('disabled')).toBeFalse();

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

    const browseMovieByQuerySpy = mockMovieSearchService.browseByQueryAndIndex.and.returnValue(of());
    const browseAlbumByQuerySpy = mockAlbumSearchService.browseByQueryAndIndex.and.returnValue(of());

    fixture.detectChanges();

    component.searchForm.get('type')?.setValue('movie');
    component.searchForm.get('query')?.setValue('');

    fixture.detectChanges();

    component.onSearch();

    expect(browseMovieByQuerySpy).toHaveBeenCalledTimes(0);
    expect(browseAlbumByQuerySpy).toHaveBeenCalledTimes(0);

  });

  it('should call movie search service when type is movie', () => {

    const browseMovieByQuerySpy = mockMovieSearchService.browseByQueryAndIndex.and.returnValue(of());
    const browseAlbumByQuerySpy = mockAlbumSearchService.browseByQueryAndIndex.and.returnValue(of());

    fixture.detectChanges();

    component.searchForm.get('type')?.setValue('movie');
    component.searchForm.get('query')?.setValue('test');

    fixture.detectChanges();

    component.onSearch();

    expect(browseMovieByQuerySpy).toHaveBeenCalledTimes(1);
    expect(browseAlbumByQuerySpy).toHaveBeenCalledTimes(0);

  });

  it('should call album search service when type is movie', () => {

    const browseMovieByQuerySpy = mockMovieSearchService.browseByQueryAndIndex.and.returnValue(of());
    const browseAlbumByQuerySpy = mockAlbumSearchService.browseByQueryAndIndex.and.returnValue(of());

    fixture.detectChanges();

    component.searchForm.get('type')?.setValue('album');
    component.searchForm.get('query')?.setValue('test');

    fixture.detectChanges();

    component.onSearch();

    expect(browseMovieByQuerySpy).toHaveBeenCalledTimes(0);
    expect(browseAlbumByQuerySpy).toHaveBeenCalledTimes(1);

  });

  it('should call search service with filter', () => {

    const browseAlbumByQueryAndFilterSpy = mockAlbumSearchService.browseByQueryAndFilter.and.returnValue(of());

    fixture.detectChanges();

    component.searchForm.get('type')?.setValue('album');
    component.searchForm.get('query')?.setValue('test');

    fixture.detectChanges();

    const filter: AlbumSearchRequest = {
      name: 'name',
      artist: 'artist',
      label: 'label'
    };

    component.onApplyFilter(filter);

    expect(browseAlbumByQueryAndFilterSpy).toHaveBeenCalled();

  });

});
