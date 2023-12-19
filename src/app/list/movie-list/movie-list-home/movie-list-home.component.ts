import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieListItem } from 'src/app/shared/models/list/movie/movie-list-item';
import { MovieListService } from 'src/app/shared/services/list/movie/movie-list.service';

@Component({
  selector: 'mlm-movie-list-home',
  templateUrl: './movie-list-home.component.html',
  styleUrls: ['./movie-list-home.component.scss']
})
export class MovieListHomeComponent {

  userMovieList$: Observable<MovieListItem[]> = this.getUserMovieList();

  constructor(private movieListService: MovieListService) { }

  private getUserMovieList(): Observable<MovieListItem[]> {
    return this.movieListService.browseLatest();
  }
}
