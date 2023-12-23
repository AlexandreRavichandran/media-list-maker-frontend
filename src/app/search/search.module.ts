import { NgModule } from "@angular/core";
import { SearchRoutingModule } from "./search-routing.module";
import { MovieDetailShowComponent } from './movie-search/movie-detail-show/movie-detail-show.component';
import { SharedModule } from "../shared/shared.module";
import { MovieRatingComponent } from './movie-search/movie-rating/movie-rating.component';
import { ImdbRatingTemplateComponent } from './movie-search/movie-rating/movie-rating-templates/imdb-rating-template/imdb-rating-template.component';
import { MetacriticRatingTemplateComponent } from './movie-search/movie-rating/movie-rating-templates/metacritic-rating-template/metacritic-rating-template.component';
import { RottenTomatoesRatingTemplateComponent } from './movie-search/movie-rating/movie-rating-templates/rotten-tomatoes-rating-template/rotten-tomatoes-rating-template.component';

@NgModule({
  declarations: [
    MovieDetailShowComponent,
    MovieRatingComponent,
    ImdbRatingTemplateComponent,
    MetacriticRatingTemplateComponent,
    RottenTomatoesRatingTemplateComponent
  ],
  imports: [
    SearchRoutingModule,
    SharedModule
  ],
  providers: []
})
export class SearchModule { }