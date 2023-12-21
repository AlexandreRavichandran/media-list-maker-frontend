import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MovieDetailShowComponent } from "./movie-search/movie-detail-show/movie-detail-show.component";

const routes: Routes = [
    { path: '' },
    { path: 'albums/:apicode' },
    { path: 'songs/:apicode' },
    { path: 'movies/:apicode', component: MovieDetailShowComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SearchRoutingModule { }