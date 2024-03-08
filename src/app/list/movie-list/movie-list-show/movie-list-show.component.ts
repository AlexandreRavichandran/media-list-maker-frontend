import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
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
  movieIllustrationPicture$: Observable<string> = this.getRandomMoviePicture();

  constructor(
    private movieListService: MovieListService,
    private movieService: MovieService) { }

  getAllUserMovieList(): Observable<MovieListItem[]> {
    return this.movieListService.browse();
  }

  onRefreshList(): void {

    this.userMovieList$ = this.getAllUserMovieList();

  }

  onItemDragnDropped($event: CdkDragDrop<MovieListItem[]>) {

    moveItemInArray($event.container.data, $event.previousIndex, $event.currentIndex);
    const itemDragnDropped: MovieListItem = $event.container.data[$event.currentIndex];

    this.userMovieList$ = this.movieListService.editSortingOrder(itemDragnDropped.id, $event.currentIndex + 1);

  }

  getRandomMoviePicture(): Observable<string> {
    return this.movieService.getRandomIllustrationPictureUrl();
  }

}
