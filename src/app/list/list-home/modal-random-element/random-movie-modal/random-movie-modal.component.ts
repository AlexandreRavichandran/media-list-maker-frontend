import { Component } from '@angular/core';
import { AbstractRandomElementModalComponent } from '../abstract-random-element-modal.component';
import { Observable, switchMap } from 'rxjs';
import { ListElement } from 'src/app/shared/models/list/list-element';
import { MovieListService } from 'src/app/shared/services/list/movie/movie-list.service';
import { MovieService } from 'src/app/shared/services/movie/movie.service';
import { MovieListItem } from 'src/app/shared/models/list/movie/movie-list-item';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'mlm-random-movie-modal',
  templateUrl: './random-movie-modal.component.html',
  styleUrls: ['./random-movie-modal.component.scss'],
  animations: [
    trigger('flash', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('1.5s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class RandomMovieModalComponent extends AbstractRandomElementModalComponent {

  override randomElement$: Observable<ListElement> = this.getRandomElement();

  constructor(
    private movieListService: MovieListService,
    private movieService: MovieService,
    private dialogRef: MatDialogRef<RandomMovieModalComponent>
  ) {
    super();
  }

  protected override getRandomElement(): Observable<ListElement> {
    return this.movieListService.getRandom().pipe(
      switchMap((movieListItem: MovieListItem) => {
        return this.movieService.readById(movieListItem.movieId);
      })
    );
  }

  public override onCloseModal(): void {
    this.dialogRef.close();
  }
  
}
