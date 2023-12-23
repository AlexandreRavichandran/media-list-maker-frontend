import { Component, Input } from '@angular/core';
import { AbstractMovieRatingTemplateComponent } from '../abstract-movie-rating-template.component';
import { Rating } from 'src/app/shared/models/movie/search/rating';

@Component({
  selector: 'mlm-imdb-rating-template',
  templateUrl: './imdb-rating-template.component.html',
  styleUrls: ['./imdb-rating-template.component.scss']
})
export class ImdbRatingTemplateComponent implements AbstractMovieRatingTemplateComponent {

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

    const number: string[] = this.rating.value.split('/');
    const value: number = Number(number[0]);

    return (value % 1 === 0 ? Math.round(value) : value) + '/10';
  }

}
