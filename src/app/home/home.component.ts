import { Component } from '@angular/core';
import { MusicService } from '../shared/services/music/music.service';
import { MovieService } from '../shared/services/movie/movie.service';
import { Observable } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'mlm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('flash', [
      state('void', style({ opacity: 0, transform: 'translateY(+20px)' })),
      transition(':enter', [
        animate('0.75s', style({ opacity: 1, transform: 'translateY(0)' })),
      ])
    ]),
  ],
})
export class HomeComponent {

  constructor(private musicService: MusicService, private movieService: MovieService) { }

  randomMusicPosterUrl$: Observable<string> = this.musicService.getRandomMusicPosterUrl();
  randomMoviePosterUrl$: Observable<string> = this.movieService.getRandomMoviePosterUrl();

}
