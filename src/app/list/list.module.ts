import { NgModule } from "@angular/core";
import { ListRoutingModule } from "./list-routing.module";
import { ListHomeComponent } from './list-home/list-home.component';
import { MovieListItemComponent } from './movie-list/movie-list-item/movie-list-item.component';
import { MovieListHomeComponent } from './movie-list/movie-list-home/movie-list-home.component';
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    ListHomeComponent,
    MovieListItemComponent,
    MovieListHomeComponent
  ],
  imports: [
    ListRoutingModule,
    CommonModule,
    SharedModule
  ],
  providers: []
})
export class ListModule { }