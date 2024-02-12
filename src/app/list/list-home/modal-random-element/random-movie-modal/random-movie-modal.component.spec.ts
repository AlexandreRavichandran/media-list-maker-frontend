import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomMovieModalComponent } from './random-movie-modal.component';
import { ListModule } from 'src/app/list/list.module';

describe('Testing random movie modal component', () => {
  let component: RandomMovieModalComponent;
  let fixture: ComponentFixture<RandomMovieModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RandomMovieModalComponent],
      imports: [ListModule]
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
