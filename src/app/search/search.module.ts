import { NgModule } from "@angular/core";
import { SearchRoutingModule } from "./search-routing.module";
import { MovieDetailShowComponent } from './movie-search/movie-detail-show/movie-detail-show.component';
import { SharedModule } from "../shared/shared.module";
import { MovieRatingComponent } from './movie-search/movie-rating/movie-rating.component';
import { ImdbRatingTemplateComponent } from './movie-search/movie-rating/movie-rating-templates/imdb-rating-template/imdb-rating-template.component';
import { MetacriticRatingTemplateComponent } from './movie-search/movie-rating/movie-rating-templates/metacritic-rating-template/metacritic-rating-template.component';
import { RottenTomatoesRatingTemplateComponent } from './movie-search/movie-rating/movie-rating-templates/rotten-tomatoes-rating-template/rotten-tomatoes-rating-template.component';
import { AlbumDetailShowComponent } from "./music-search/album-detail-show/album-detail-show.component";
import { SongItemComponent } from './music-search/album-detail-show/song-item/song-item.component';
import { SongListComponent } from './music-search/album-detail-show/song-list/song-list.component';
import { SearchComponent } from './search.component';
import { ReactiveFormsModule } from "@angular/forms";
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchResultAlbumComponent } from './search-result/search-result-album/search-result-album.component';
import { SearchResultMovieComponent } from './search-result/search-result-movie/search-result-movie.component';

@NgModule({
  declarations: [
    MovieDetailShowComponent,
    MovieRatingComponent,
    AlbumDetailShowComponent,
    ImdbRatingTemplateComponent,
    MetacriticRatingTemplateComponent,
    RottenTomatoesRatingTemplateComponent,
    SongItemComponent,
    SongListComponent,
    SearchComponent,
    SearchResultComponent,
    SearchResultAlbumComponent,
    SearchResultMovieComponent
  ],
  imports: [
    SharedModule,
    SearchRoutingModule,
    ReactiveFormsModule
  ],

  providers: []
})
export class SearchModule { }