import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListHomeComponent } from "./list-home/list-home.component";

const routes: Routes = [
    { path: '', component: ListHomeComponent },
    { path: 'list/movies' },
    { path: 'list/musics' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListRoutingModule { }