import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { of } from 'rxjs';

describe('Testing paginaion component', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;

    component.currentIndex = 20;
    component.totalResults = 220;
    component.elementsPerPage = 20;
    component.currentPage$ = of(2);

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return total page', () => {

    const testValue = component.getTotalPages();

    expect(testValue).toEqual(11);

  });

  it('should generate page array', () => {

    component.totalPages = 3;

    const testArray = component.generatePageArray();

    expect(testArray).toEqual([1, 2, 3]);

  });

  it('should get on next page', () => {

    spyOn(component.onNextPageEvent, 'emit');

    component.onGetNextPage(3);

    expect(component.onNextPageEvent.emit).toHaveBeenCalledWith({ nextIndex: 40, nextPage: 3 });

    expect(component.currentIndex).toEqual(40);

  });

  it('should get on previous page', () => {

    spyOn(component.onPreviousPageEvent, 'emit');

    component.onGetPreviousPage(1);

    expect(component.onPreviousPageEvent.emit).toHaveBeenCalledWith({ nextIndex: 0, nextPage: 1 });

    expect(component.currentIndex).toEqual(0);

  });

  it('should get on specific page next to current page', () => {

    spyOn(component.onNextPageEvent, 'emit');

    component.onGetSpecificPage(5, 3);

    expect(component.onNextPageEvent.emit).toHaveBeenCalledWith({ nextIndex: 60, nextPage: 5 });

  });

  it('should get on specific page prevous to current page', () => {

    spyOn(component.onNextPageEvent, 'emit');

    component.currentIndex = 80;

    component.onGetSpecificPage(3, 5);

    expect(component.onNextPageEvent.emit).toHaveBeenCalledWith({ nextIndex: 40, nextPage: 3 });

  });

  it('should get on specific page equal to current page', () => {

    spyOn(component.onNextPageEvent, 'emit');

    component.onGetSpecificPage(3, 3);

    expect(component.onNextPageEvent.emit).toHaveBeenCalledTimes(0);


  });

  it('should return max index displayed', () => {

    const value = component.getMaxIndexDisplayed();

    expect(value).toEqual(40);

  });

  it('should return total result if max index displayed is over total result ', () => {

    component.currentIndex = 210;

    const value = component.getMaxIndexDisplayed();

    expect(value).toEqual(component.totalResults);

  });

});
