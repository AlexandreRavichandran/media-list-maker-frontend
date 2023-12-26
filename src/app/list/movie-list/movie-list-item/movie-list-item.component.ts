import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MovieListItem } from 'src/app/shared/models/list/movie/movie-list-item';

@Component({
  selector: 'mlm-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.scss']
})
export class MovieListItemComponent {

  @Input()
  movieItem!: MovieListItem;

  constructor(private router: Router) { }

  onClickDetails(): void {
    this.router.navigate(['/search/movies/', this.movieItem.movieDetail?.apiCode]);
  }

}
