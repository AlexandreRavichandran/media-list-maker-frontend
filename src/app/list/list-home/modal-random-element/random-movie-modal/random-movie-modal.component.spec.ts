import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomMovieModalComponent } from './random-movie-modal.component';

describe('RandomMovieModalComponent', () => {
  let component: RandomMovieModalComponent;
  let fixture: ComponentFixture<RandomMovieModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomMovieModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomMovieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
