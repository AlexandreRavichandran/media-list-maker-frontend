import { Component, Input } from '@angular/core';
import { AbstractMovieRatingTemplateComponent } from '../abstract-movie-rating-template.component';
import { Rating } from 'src/app/shared/models/movie/search/rating';

@Component({
  selector: 'mlm-rotten-tomatoes-rating-template',
  templateUrl: './rotten-tomatoes-rating-template.component.html',
  styleUrls: ['./rotten-tomatoes-rating-template.component.scss']
})
export class RottenTomatoesRatingTemplateComponent implements AbstractMovieRatingTemplateComponent {

  @Input()
  rating!: Rating;

  public applyColorRule(): string {

    const value: number = Number(this.rating.value.split('%')[0]);
    let redColor: number = 238;
    let greenColor: number = 109;

    greenColor = value >= 50 ? 141 : value / 100 * 141;
    redColor = value <= 50 ? 141 : 141 - (value / 100 * 141);

    return `rgb(${redColor}, ${greenColor}, 22)`;

  }

  public formatRate(): string {
    return this.rating.value;
  }

}
