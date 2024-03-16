import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, map, of, shareReplay } from 'rxjs';
import { NotificationTypeConstant } from 'src/app/shared/constants/notification-type.constant';
import { MovieDetails } from 'src/app/shared/models/movie/search/movie-details';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { MovieListService } from 'src/app/shared/services/list/movie/movie-list.service';
import { MovieSearchService } from 'src/app/shared/services/movie-search/movie-search.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { StateInitializerService } from 'src/app/shared/services/state-initializer/state-initializer.service';

@Component({
  selector: 'mlm-movie-detail-show',
  templateUrl: './movie-detail-show.component.html',
  styleUrls: ['./movie-detail-show.component.scss']
})
export class MovieDetailShowComponent implements OnInit {

  movieDetail$!: Observable<MovieDetails>
  isAlreadyInList$!: Observable<boolean>;
  displayAddLoadingButton: boolean = false;

  constructor(
    private movieSearchService: MovieSearchService,
    private movieListService: MovieListService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private notificationService: NotificationService,
    private authService: AuthService, 
    private stateInitializer: StateInitializerService
  ) { }

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

    if (!this.authService.isUserLogged()) {
      this.router.navigate(['/login']);
      return;
    }

    this.displayAddLoadingButton = true;

    this.movieListService.add(apiCode)
      .pipe(
        map(response => {
          this.displayAddLoadingButton = false;
          this.isAlreadyInList$ = of(true);
          this.notificationService.addNewNotification('Movie added in list !', NotificationTypeConstant.SUCCESS.type);
          return response;
        }),
        catchError(error => {
          this.displayAddLoadingButton = false;
          this.notificationService.addNewNotification(error.message, NotificationTypeConstant.ERROR.type);
          return of(null);
        })
      )
      .subscribe();

  }

  getLoadingColor(): string {
    return "#240089"
  }

  goBack(): void {
    this.location.back();
  }
}
