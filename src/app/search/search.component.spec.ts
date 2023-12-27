import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { AppModule } from '../app.module';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchModule } from './search.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {

  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [SearchModule, AppModule]
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

    component.onTypeChange();

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const searchButton: HTMLButtonElement = element.query(By.css('.search__button')).nativeElement;

    expect(searchButton.classList.contains('search__movie__button')).toBeFalse();
    expect(searchButton.classList.contains('search__music__button')).toBeTrue();
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

});
