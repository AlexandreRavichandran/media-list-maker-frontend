import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFormComponent } from './filter-form.component';
import { SearchModule } from '../../search.module';
import { BaseSearchRequest } from 'src/app/shared/models/base-search-request';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

describe('Testing filter form component', () => {
  let component: FilterFormComponent;
  let fixture: ComponentFixture<FilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterFormComponent],
      imports: [
        SearchModule,
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([])
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit when triggering onApplyFilter', () => {

    spyOn(component.applyFilterEvent, 'emit');

    const filter: BaseSearchRequest = {
      name: 'name'
    };

    component.onApplyFilter(filter);

    expect(component.applyFilterEvent.emit).toHaveBeenCalledWith(filter);

  });

});
