import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlbumSearchRequest } from 'src/app/shared/models/music/search/album/album-search-request';
import { AlbumSearchService } from 'src/app/shared/services/music-search/album/album-search.service';

@Component({
  selector: 'mlm-album-filter-form',
  templateUrl: './album-filter-form.component.html',
  styleUrls: ['./album-filter-form.component.scss']
})
export class AlbumFilterFormComponent {

  albumForm: FormGroup = this.albumSearchService.generateFilterForm();

  @Output()
  applyFilterEvent: EventEmitter<AlbumSearchRequest> = new EventEmitter();

  constructor(private albumSearchService: AlbumSearchService) { }

  onResetForm(): void {
    this.albumForm.reset();
  }

  onApplyFilter(): void {
    this.applyFilterEvent.emit(this.albumForm.value);
  }

}
