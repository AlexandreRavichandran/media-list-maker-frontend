import { Component, Input } from '@angular/core';
import { Rating } from 'src/app/shared/models/movie/search/rating';
import { MovieRatingSourceConstants } from 'src/app/shared/constants/movie-rating-source-constants';

@Component({
  selector: 'mlm-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.scss']
})
export class MovieRatingComponent {

  @Input()
  movieRatingList!: Rating[];

  movieRatingConstants: MovieRatingSourceConstants = new MovieRatingSourceConstants();

}
