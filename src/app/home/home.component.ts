import { Component } from '@angular/core';
import { MusicService } from '../shared/services/music/music.service';
import { MovieService } from '../shared/services/movie/movie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'mlm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private musicService: MusicService, private movieService: MovieService) { }

  randomMusicPosterUrl$: Observable<string> = this.musicService.getRandomMusicPosterUrl();
  randomMoviePosterUrl$: Observable<string> = this.movieService.getRandomMoviePosterUrl();

}
