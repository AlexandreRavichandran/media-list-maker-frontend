import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { MusicListItem } from 'src/app/shared/models/list/music/music-list-item';
import { MusicListService } from 'src/app/shared/services/list/music/music-list.service';
import { MusicService } from 'src/app/shared/services/music/music.service';

@Component({
  selector: 'mlm-music-list-show',
  templateUrl: './music-list-show.component.html',
  styleUrls: ['./music-list-show.component.scss']
})
export class MusicListShowComponent {

  userMusicList$: Observable<MusicListItem[]> = this.getAllUserMusicList();

  constructor(
    private musicListService: MusicListService) { }

  getAllUserMusicList(): Observable<MusicListItem[]> {
    return this.musicListService.browse();
  }

  onRefreshList(): void {

    this.userMusicList$ = this.getAllUserMusicList();

  }

  onItemDragnDropped($event: CdkDragDrop<MusicListItem[]>) {

    moveItemInArray($event.container.data, $event.previousIndex, $event.currentIndex);
    const itemDragnDropped: MusicListItem = $event.container.data[$event.currentIndex];

    this.userMusicList$ = this.musicListService.editSortingOrder(itemDragnDropped.id, $event.currentIndex + 1);

  }
}