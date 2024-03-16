import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MovieService } from '../shared/services/movie/movie.service';
import { MusicService } from '../shared/services/music/music.service';
import { AppModule } from '../app.module';

describe('Testing home component', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockMusicService: jasmine.SpyObj<MusicService>;
  let mockMovieService: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {

    mockMusicService = jasmine.createSpyObj('MovieService', ['getRandomMusicPosterUrl'])
    mockMovieService = jasmine.createSpyObj('MovieService', ['getRandomMoviePosterUrl'])

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: MusicService, useValue: mockMusicService },
        { provide: MovieService, useValue: mockMovieService }
      ],
      imports: [
        AppModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
