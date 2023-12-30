import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumFilterFormComponent } from './album-filter-form.component';
import { SearchModule } from 'src/app/search/search.module';
import { AlbumSearchRequest } from 'src/app/shared/models/music/search/album/album-search-request';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';

describe('Testing album filter form component', () => {
  let component: AlbumFilterFormComponent;
  let fixture: ComponentFixture<AlbumFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlbumFilterFormComponent],
      imports: [SearchModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumFilterFormComponent);
    component = fixture.componentInstance;

    component.albumForm = new FormGroup({
      'name': new FormControl('name'),
      'artist': new FormControl('artist'),
      'label': new FormControl('label')
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit when clicking on apply filter button', () => {

    spyOn(component.applyFilterEvent, 'emit');

    const filter: AlbumSearchRequest = {
      name: 'name',
      artist: 'artist',
      label: 'label'
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

    expect(component.albumForm.get('name')?.value).toBeNull();
    expect(component.albumForm.get('artist')?.value).toBeNull();
    expect(component.albumForm.get('label')?.value).toBeNull();

  });

});
