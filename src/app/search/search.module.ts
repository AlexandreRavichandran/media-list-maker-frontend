import { NgModule } from "@angular/core";
import { SearchRoutingModule } from "./search-routing.module";
import { MovieDetailShowComponent } from './movie-search/movie-detail-show/movie-detail-show.component';
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
    MovieDetailShowComponent
  ],
    imports: [
        SearchRoutingModule,
        SharedModule
    ],
    providers: []
})
export class SearchModule { }