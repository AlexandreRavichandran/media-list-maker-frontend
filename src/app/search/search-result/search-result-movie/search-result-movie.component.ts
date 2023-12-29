import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MovieSearchList } from 'src/app/shared/models/movie/search/movie-search-list';

@Component({
  selector: 'mlm-search-result-movie',
  templateUrl: './search-result-movie.component.html',
  styleUrls: ['./search-result-movie.component.scss']
})
export class SearchResultMovieComponent {

  @Input()
  searchResults!: MovieSearchList;

  constructor(private router: Router) { }

  onClickMovieDetails(movieApiCode: string): void {
    this.router.navigate(['/search/movies', movieApiCode]);
  }

}
