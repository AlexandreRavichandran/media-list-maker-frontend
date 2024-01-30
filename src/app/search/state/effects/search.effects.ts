import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AlbumSearchService } from "src/app/shared/services/music-search/album/album-search.service";
import { SearchApiActions, SearchPageActions } from "../actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { MovieSearchService } from "src/app/shared/services/movie-search/movie-search.service";
import { SearchService } from "src/app/shared/services/search-service.services";
import { ElementSearchResult } from "src/app/shared/models/element-search-result";

@Injectable()
export class SearchEffects {

    constructor(
        private actions$: Actions,
        private albumService: AlbumSearchService,
        private movieService: MovieSearchService) { }

    searchElementWithIndex$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(SearchPageActions.onSearchElement),
                mergeMap((action) => this.getServiceBySearchedElementType(action.elementType).browseByQueryAndIndex(action.query, action.index)
                    .pipe(
                        map((elements: ElementSearchResult) => SearchApiActions.onSearchElementSuccess({ searchResults: elements })),
                        catchError(error => of(SearchApiActions.onSearchElementFailure({ error })))
                    ))
            );

    });

    searchElementWithFilter$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(SearchPageActions.onSearchElementWithFilter),
                mergeMap((action) => this.getServiceBySearchedElementType(action.elementType).browseByQueryAndFilter(action.query, action.index, action.filter)
                    .pipe(
                        map((elements: ElementSearchResult) => SearchApiActions.onSearchElementWithFilterSuccess({ searchResults: elements })),
                        catchError(error => of(SearchApiActions.onSearchElementWithFilterFailure({ error })))
                    ))
            );
    });

    private getServiceBySearchedElementType(type: number): SearchService {
        if (type === 1) {
            return this.movieService;
        } else {
            return this.albumService;
        }
    }
}