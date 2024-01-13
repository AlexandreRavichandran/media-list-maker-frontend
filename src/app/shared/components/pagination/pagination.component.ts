import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  totalPages: number = 0;

  ngOnInit(): void {
    console.log("create new");
    this.totalPages = this.getTotalPages();
  }

  getFromIndex(): number {
    let fromIndex: number = this.currentIndex - this.elementsPerPage;
    if (fromIndex === 0) {
      fromIndex = 1;
    }
    return fromIndex
  }

  getTotalPages(): number {
    console.log(this.totalResults)
    console.log(this.elementsPerPage);
    console.log(Math.round(this.totalResults / this.elementsPerPage))
    return Math.round(this.totalResults / this.elementsPerPage);
  }

  generatePageArray(): number[] {
    console.log(Array.from({ length: this.totalPages }, (_, index) => index + 1))
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  onGetNextPage(): void {
    this.onNextPageEvent.emit(this.currentIndex + this.elementsPerPage);
    this.currentIndex += this.elementsPerPage; 
  }

  onGetPreviousPage(): void {
    this.onPreviousPageEvent.emit(this.currentIndex - this.elementsPerPage);
    this.currentIndex -= this.elementsPerPage; 
  }

}
