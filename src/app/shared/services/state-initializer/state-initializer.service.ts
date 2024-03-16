import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SearchPageActions } from 'src/app/search/state/actions';
import { SearchState } from 'src/app/search/state/search.state';

@Injectable({
  providedIn: 'root'
})
export class StateInitializerService implements OnDestroy {

  private routerSubscription!: Subscription;

  constructor(private router: Router, private store: Store<SearchState>) {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.resetStateIfLeavingSearchModule(this.router.url);
      }
    });
  }

  private resetStateIfLeavingSearchModule(url: string) {
    if (!this.isCurrentUrlInSearchModule(url)) {
      this.resetState();
    }
  }

  private isCurrentUrlInSearchModule(url: string): boolean {
    return url.startsWith('/search');
  }

  private resetState(): void {
    this.store.dispatch(SearchPageActions.onClearState());
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

}
