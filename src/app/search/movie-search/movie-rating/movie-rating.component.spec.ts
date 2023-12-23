import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieRatingComponent } from './movie-rating.component';

describe('Testing movie rating component', () => {

  let component: MovieRatingComponent;
  let fixture: ComponentFixture<MovieRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieRatingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
