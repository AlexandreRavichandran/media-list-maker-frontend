import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MovieSearchRequest } from 'src/app/shared/models/movie/search/movie-search-request';
import { MovieSearchService } from 'src/app/shared/services/movie-search/movie-search.service';

@Component({
  selector: 'mlm-movie-filter-form',
  templateUrl: './movie-filter-form.component.html',
  styleUrls: ['./movie-filter-form.component.scss']
})
export class MovieFilterFormComponent {

  movieForm: FormGroup = this.movieSearchService.generateFilterForm();

  @Output()
  applyFilterEvent: EventEmitter<MovieSearchRequest> = new EventEmitter();

  constructor(private movieSearchService: MovieSearchService) { }

  onResetForm(): void {
    this.movieForm.reset();
  }

  onApplyFilter(): void {
    this.applyFilterEvent.emit(this.movieForm.value);
  }

}
