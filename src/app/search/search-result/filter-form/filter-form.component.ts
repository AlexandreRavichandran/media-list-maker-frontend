import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseSearchRequest } from 'src/app/shared/models/base-search-request';

@Component({
  selector: 'mlm-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent {

  @Input()
  type!: string;

  @Output()
  applyFilterEvent: EventEmitter<BaseSearchRequest> = new EventEmitter();

  onApplyFilter(queryObject: BaseSearchRequest): void {
    this.applyFilterEvent.emit(queryObject);
  }

}
