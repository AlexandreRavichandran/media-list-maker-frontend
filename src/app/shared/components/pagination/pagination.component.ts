import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AlbumSearchList } from '../../models/music/search/album/album-search-list';
import { getCurrentPage } from 'src/app/search/state/selectors/search.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'mlm-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Output()
  onNextPageEvent: EventEmitter<number> = new EventEmitter();

  @Output()
  onPreviousPageEvent: EventEmitter<number> = new EventEmitter();

  @Input()
  currentIndex!: number;

  @Input()
  totalResults!: number;

  @Input()
  elementsPerPage!: number;

  currentPage$: Observable<number> = this.albumStore.select(getCurrentPage);

  totalPages: number = 0;

  constructor(private albumStore: Store<AlbumSearchList>) { }

  ngOnInit(): void {
    this.totalPages = this.getTotalPages();
  }

  getTotalPages(): number {
    return Math.round(this.totalResults / this.elementsPerPage);
  }

  generatePageArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  onGetNextPage(): void {
    if(this.currentIndex === 1) {
      this.currentIndex = 0;
    }
    this.onNextPageEvent.emit(this.currentIndex + this.elementsPerPage);
    this.currentIndex += this.elementsPerPage;
  }

  onGetPreviousPage(): void {
    this.onPreviousPageEvent.emit(this.currentIndex - this.elementsPerPage);
    this.currentIndex -= this.elementsPerPage;
  }

}
