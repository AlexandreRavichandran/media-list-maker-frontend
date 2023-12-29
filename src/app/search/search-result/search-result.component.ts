import { Component, Input } from '@angular/core';
import { ElementSearchResult } from 'src/app/shared/models/element-search-result';


@Component({
  selector: 'mlm-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {

  @Input()
  searchResults!: ElementSearchResult;

  @Input()
  type!: string;
}
