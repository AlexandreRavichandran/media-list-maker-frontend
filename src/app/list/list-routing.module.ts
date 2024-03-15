import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListHomeComponent } from "./list-home/list-home.component";
import { MovieListShowComponent } from "./movie-list/movie-list-show/movie-list-show.component";
import { MusicListShowComponent } from "./music-list/music-list-show/music-list-show.component";
import { PageNotFoundComponent } from "../shared/components/page-not-found/page-not-found.component";

const routes: Routes = [
    { path: '', component: ListHomeComponent },
    { path: 'list/movies', component: MovieListShowComponent },
    { path: 'list/musics', component: MusicListShowComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListRoutingModule { }