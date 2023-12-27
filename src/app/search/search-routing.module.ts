import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MovieDetailShowComponent } from "./movie-search/movie-detail-show/movie-detail-show.component";
import { AlbumDetailShowComponent } from "./music-search/album-detail-show/album-detail-show.component";
import { SearchComponent } from "./search.component";

const routes: Routes = [
    { path: '', component: SearchComponent },
    { path: 'albums/:apicode', component: AlbumDetailShowComponent },
    { path: 'songs/:apicode' },
    { path: 'movies/:apicode', component: MovieDetailShowComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SearchRoutingModule { }