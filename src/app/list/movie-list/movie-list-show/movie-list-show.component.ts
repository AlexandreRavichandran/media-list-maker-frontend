import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MovieListItem } from 'src/app/shared/models/list/movie/movie-list-item';
import { MovieListService } from 'src/app/shared/services/list/movie/movie-list.service';
import { MovieService } from 'src/app/shared/services/movie/movie.service';

@Component({
  selector: 'mlm-movie-list-show',
  templateUrl: './movie-list-show.component.html',
  styleUrls: ['./movie-list-show.component.scss']
})
export class MovieListShowComponent {

  userMovieList$: Observable<MovieListItem[]> = this.getAllUserMovieList();

  randomMoviePictureUrl$: Observable<string> = this.movieService.getRandomIllustrationPictureUrl();

  constructor(
    private movieListService: MovieListService,
    private movieService: MovieService
  ) { }

  getAllUserMovieList(): Observable<MovieListItem[]> {
    return this.movieListService.browse();
  }

}
