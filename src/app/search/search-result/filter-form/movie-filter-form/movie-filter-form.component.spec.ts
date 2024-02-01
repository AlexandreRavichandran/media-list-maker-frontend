import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFilterFormComponent } from './movie-filter-form.component';
import { SearchModule } from 'src/app/search/search.module';
import { MovieSearchRequest } from 'src/app/shared/models/movie/search/movie-search-request';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

describe('Testing movie filter form component', () => {
  let component: MovieFilterFormComponent;
  let fixture: ComponentFixture<MovieFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieFilterFormComponent],
      imports: [
        SearchModule,
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([])
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieFilterFormComponent);
    component = fixture.componentInstance;

    component.movieForm = new FormGroup({
      'name': new FormControl('name'),
      'year': new FormControl('2010'),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit when clicking on apply filter button', () => {

    spyOn(component.applyFilterEvent, 'emit');

    const filter: MovieSearchRequest = {
      name: 'name',
      year: '2010'
    };

    const element: DebugElement = fixture.debugElement;
    const applyFilterButton: HTMLButtonElement = element.query(By.css('.apply__button')).nativeElement;

    applyFilterButton.click();

    expect(component.applyFilterEvent.emit).toHaveBeenCalledWith(filter);

  });

  it('should reset filter form when clicking on reset filter button', () => {

    const element: DebugElement = fixture.debugElement;
    const resetFilterButton: HTMLButtonElement = element.query(By.css('.reset__button')).nativeElement;

    resetFilterButton.click();

    expect(component.movieForm.get('name')?.value).toBeNull();
    expect(component.movieForm.get('year')?.value).toBeNull();

  });


});
