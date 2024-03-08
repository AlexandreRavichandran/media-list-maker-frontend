import { Component, Input } from '@angular/core';
import { AbstractMovieRatingTemplateComponent } from '../abstract-movie-rating-template.component';
import { Rating } from 'src/app/shared/models/movie/search/rating';

@Component({
  selector: 'mlm-metacritic-rating-template',
  templateUrl: './metacritic-rating-template.component.html',
  styleUrls: ['./metacritic-rating-template.component.scss']
})
export class MetacriticRatingTemplateComponent implements AbstractMovieRatingTemplateComponent {

  @Input()
  rating!: Rating;

  public applyColorRule(): string {

    const value: number = eval(this.rating.value);
    let redColor: number = 238;
    let greenColor: number = 109;

    greenColor = value >= 0.5 ? 141 : value * 141;
    redColor = value <= 0.5 ? 141 : 141 - (value * 141);

    return `rgb(${redColor}, ${greenColor}, 22)`;

  }

  public formatRate(): string {

    const rate: number = eval(this.rating.value) * 100;

    return Math.round(rate) + '%';

  }


}
