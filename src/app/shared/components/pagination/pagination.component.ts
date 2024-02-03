import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'mlm-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Output()
  onNextPageEvent: EventEmitter<{ nextIndex: number, nextPage: number }> = new EventEmitter();

  @Output()
  onPreviousPageEvent: EventEmitter<{ nextIndex: number, nextPage: number }> = new EventEmitter();

  @Input()
  currentIndex!: number;

  @Input()
  totalResults!: number;

  @Input()
  elementsPerPage!: number;

  @Input()
  paginationColor!: string;

  @Input()
  currentPage$!: Observable<number>;

  totalPages: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.totalPages = this.getTotalPages();
  }

  getTotalPages(): number {
    return Math.ceil(this.totalResults / this.elementsPerPage);
  }

  generatePageArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  showAvailablePages(currentPage: number): number[] {
    const pages = this.generatePageArray();

    const previousAvailablePages = Math.max(1, currentPage - 2);

    const endPage = Math.min(this.totalPages, currentPage + 2);

    return pages.slice(previousAvailablePages - 1, endPage);

  }

  onGetNextPage(nextPage: number): void {
    if (this.currentIndex === 1) {
      this.currentIndex = 0;
    }

    const nextIndex = this.currentIndex + this.elementsPerPage;

    this.onNextPageEvent.emit({ nextIndex, nextPage });
    this.currentIndex += this.elementsPerPage;

  }

  onGetPreviousPage(nextPage: number): void {

    const nextIndex = this.currentIndex - this.elementsPerPage;

    this.onPreviousPageEvent.emit({ nextIndex, nextPage });
    this.currentIndex -= this.elementsPerPage;

  }

  onGetSpecificPage(specificPage: number, currentPage: number): void {

    let nextIndex = 0;
    if (specificPage > currentPage) {
      nextIndex = this.currentIndex + this.elementsPerPage * (specificPage - currentPage);
    } else {
      nextIndex = this.currentIndex - this.elementsPerPage * (currentPage - specificPage);
    }

    this.onNextPageEvent.emit({ nextIndex, nextPage: specificPage });
  }

  public getMaxIndexDisplayed(): number
  {
    let maxIndexDisplayed = this.currentIndex + this.elementsPerPage;

    if(maxIndexDisplayed > this.totalResults) {
      maxIndexDisplayed = this.totalResults;
    }

    return maxIndexDisplayed;
  }

}
