import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    { path: 'albums' },
    { path: 'movies' },
    { path: 'songs' },
    { path: 'albums/:apicode' },
    { path: 'songs/:apicode' },
    { path: 'movies/:apicode' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SearchRoutingModule { }