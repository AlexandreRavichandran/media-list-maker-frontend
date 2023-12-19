import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListItemComponent } from './movie-list-item.component';
import { ListModule } from '../../list.module';
import { SharedModule } from 'src/app/shared/shared.module';

describe('MovieListItemComponent', () => {
  let component: MovieListItemComponent;
  let fixture: ComponentFixture<MovieListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieListItemComponent],
      imports: [ListModule, SharedModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListItemComponent);
    component = fixture.componentInstance;

    fixture.componentInstance.movieItem = {
      id: 1,
      movieId: 1,
      appUserId: 1,
      addedAt: new Date(),
      sortingNumber: 1,
      movieDetail: undefined
    };

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
