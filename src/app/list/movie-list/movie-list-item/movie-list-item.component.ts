import { Component, Input } from '@angular/core';
import { MovieListItem } from 'src/app/shared/models/list/movie/movie-list-item';

@Component({
  selector: 'mlm-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.scss']
})
export class MovieListItemComponent {

  @Input()
  movieItem!: MovieListItem;

  onClickDetails(): void {
      //not implemented
  }

}
