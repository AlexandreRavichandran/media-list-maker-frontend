import { NgModule } from "@angular/core";
import { ListRoutingModule } from "./list-routing.module";
import { ListHomeComponent } from './list-home/list-home.component';
import { MovieListItemComponent } from './movie-list/movie-list-item/movie-list-item.component';
import { MovieListHomeComponent } from './movie-list/movie-list-home/movie-list-home.component';
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { MusicListHomeComponent } from './music-list/music-list-home/music-list-home.component';
import { MusicListItemComponent } from './music-list/music-list-item/music-list-item.component';
import { MovieListShowComponent } from './movie-list/movie-list-show/movie-list-show.component';
import { MusicListShowComponent } from './music-list/music-list-show/music-list-show.component';

@NgModule({
  declarations: [
    ListHomeComponent,
    MovieListItemComponent,
    MovieListHomeComponent,
    MusicListHomeComponent,
    MusicListItemComponent,
    MovieListShowComponent,
    MusicListShowComponent
  ],
  imports: [
    ListRoutingModule,
    CommonModule,
    SharedModule
  ],
  providers: []
})
export class ListModule { }