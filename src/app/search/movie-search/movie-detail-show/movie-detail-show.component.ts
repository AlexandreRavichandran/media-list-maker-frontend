import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, map, of, shareReplay } from 'rxjs';
import { MovieDetails } from 'src/app/shared/models/movie/search/movie-details';
import { MovieListService } from 'src/app/shared/services/list/movie/movie-list.service';
import { MovieSearchService } from 'src/app/shared/services/movie-search/movie-search.service';

@Component({
  selector: 'mlm-movie-detail-show',
  templateUrl: './movie-detail-show.component.html',
  styleUrls: ['./movie-detail-show.component.scss']
})
export class MovieDetailShowComponent implements OnInit {

  //TODO
  movieDetailExample: MovieDetails = {
    "genreList": [
      "Drama",
      "Mystery",
      "Thriller"
    ],
    "apiCode": "tt0071315",
    "title": "Chinatown",
    "releasedAt": 1974,
    "duration": "130 min",
    "mainActors": "Jack Nicholson, Faye Dunaway, John Huston",
    "synopsis": "In 1937 Los Angeles, private investigator Jake 'J.J.' Gittes specializes in cheating-spouse cases. His current target is Hollis Mulwray, high-profile chief engineer for the Los Angeles Department of Water and Power, whose wife suspects him of infidelity. In following Mulwray, Gittes witnesses some usual business dealings, such as a public meeting for construction of a new dam to create additional water supply for Los Angeles, as fresh water is vital to the growing community during the chronic drought; Mulwray opposes the dam. Eventually Gittes sees Mulwray meeting with an unknown young woman who isn't his wife. Once news of the supposed tryst between Mulwray and this woman hits the media, additional information comes to light that makes Gittes believe that Mulwray is being framed for something and that he himself is being set up. In his investigation of the issue behind Mulwray's framing and his own setup, Gittes is assisted by Mulwray's wife Evelyn, but he thinks she isn't being forthright with him. The further he gets into the investigation, the more secrets he uncovers about the Mulwrays' professional and personal dealings, including Mulwray's former business-partnership with Evelyn's father, Noah Cross. The identity of the unknown woman may be the key to uncovering the whole story.",
    "director": "Roman Polanski",
    "ratings": [
      {
        "source": "Internet Movie Database",
        "value": "8.2/10"
      },
      {
        "source": "Rotten Tomatoes",
        "value": "99%"
      },
      {
        "source": "Metacritic",
        "value": "92/100"
      }
    ],
    "pictureUrl": "https://m.media-amazon.com/images/M/MV5BMjJkMDZhYzItZTFhMi00ZGI4LThlNTAtZDNlYmEwNjFkNDYzXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg"
  }

  movieDetail$!: Observable<MovieDetails>
  isAlreadyInList$!: Observable<boolean>;
  displayAddLoadingButton: boolean = false;

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
    this.isAlreadyInList$ = this.movieListService.isAlreadyInAppUserMovieList(apiCode).pipe(shareReplay(1));

  }

  toHourMinute(duration: string): string {
    let totalMinute = duration.split(' ')[0];


    const totalHour: number = Math.floor(Number(totalMinute) / 60);
    const remaningMinutes = Number(totalMinute) % 60;

    return totalHour + 'h' + remaningMinutes + 'min';
  }

  onAddToList(apiCode: string): void {

    this.displayAddLoadingButton = true;

    this.movieListService.add(apiCode)
      .pipe(
        map(response => {
          this.displayAddLoadingButton = false;
          this.isAlreadyInList$ = of(true);

          return response;
        }),
        catchError(error => {
          console.log(error);
          this.displayAddLoadingButton = false;
          return of(null);
        })
      )
      .subscribe();

  }
}
