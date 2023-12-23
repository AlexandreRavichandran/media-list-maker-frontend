import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { MovieDetails } from 'src/app/shared/models/movie/search/movie-details';
import { MovieListService } from 'src/app/shared/services/list/movie/movie-list.service';
import { MovieSearchService } from 'src/app/shared/services/movie-search/movie-search.service';

@Component({
  selector: 'app-movie-detail-show',
  templateUrl: './movie-detail-show.component.html',
  styleUrls: ['./movie-detail-show.component.scss']
})
export class MovieDetailShowComponent implements OnInit {

  movieDetail$!: Observable<MovieDetails>;

  constructor(
    private movieSearchService: MovieSearchService,
    private movieListService: MovieListService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const apiCode: string | null = this.activatedRoute.snapshot.paramMap.get('apicode');

    if (apiCode === null) {
      this.router.navigate(['/me']);
      return;
    }

    this.movieDetail$ = this.movieSearchService.getByApiCode(apiCode);

  }

  toHourMinute(duration: string): string {
    let totalMinute = duration.split(' ')[0];


    const totalHour: number = Math.floor(Number(totalMinute) / 60);
    const remaningMinutes = Number(totalMinute) % 60;

    return totalHour + 'h' + remaningMinutes + 'min';
  }

  onAddToList(apiCode: string): void {

    this.movieListService.add(apiCode)
      .pipe(
        map(response => {
          console.log(response);

          this.movieDetail$ = this.movieDetail$.pipe(
            map(detail => ({ ...detail, isAlreadyInList: true }))
          );

          return response;
        }),
        catchError(error => {
          console.log(error);
          return of(null);
        })
      )
      .subscribe();

  }
}
