import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MovieListItem } from 'src/app/shared/models/list/movie/movie-list-item';
import { MovieListService } from 'src/app/shared/services/list/movie/movie-list.service';

@Component({
  selector: 'mlm-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.scss']
})
export class MovieListItemComponent {

  @Input()
  movieItem!: MovieListItem;

  @Input()
  isDeletable!: boolean;

  @Output()
  onDeleteItemEvent: EventEmitter<null> = new EventEmitter();

  constructor(private movieListService: MovieListService, private router: Router) { }

  onClickDetails(): void {
    this.router.navigate(['/search/movies/', this.movieItem.movieDetail?.apiCode]);
  }

  onDelete(): void {

    this.movieListService.deleteById(this.movieItem.id).subscribe({
      next: () => this.onDeleteItemEvent.emit()
    });

  }
}
