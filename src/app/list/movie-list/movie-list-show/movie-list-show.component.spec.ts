import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListShowComponent } from './movie-list-show.component';
import { ListModule } from '../../list.module';
import { AppModule } from 'src/app/app.module';

describe('Testing movie list show component', () => {

  let component: MovieListShowComponent;
  let fixture: ComponentFixture<MovieListShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieListShowComponent],
      imports: [ListModule, AppModule]
    })
      .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
