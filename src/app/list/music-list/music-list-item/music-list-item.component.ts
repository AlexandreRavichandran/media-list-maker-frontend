import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MusicListItem } from 'src/app/shared/models/list/music/music-list-item';
import { MusicListService } from 'src/app/shared/services/list/music/music-list.service';

@Component({
  selector: 'mlm-music-list-item',
  templateUrl: './music-list-item.component.html',
  styleUrls: ['./music-list-item.component.scss']
})
export class MusicListItemComponent {

  @Input()
  musicItem!: MusicListItem;

  @Input()
  isDeletable!: boolean;

  @Output()
  onDeleteItemEvent: EventEmitter<null> = new EventEmitter();

  constructor(private musicListService: MusicListService, private router: Router) { }

  onClickDetails(): void {
    this.router.navigate(['/search/albums/', this.musicItem.musicDetail?.apiCode]);
  }

  onDelete(): void {

    this.musicListService.deleteById(this.musicItem.id).subscribe({
      next: () => this.onDeleteItemEvent.emit()
    });

  }

}
