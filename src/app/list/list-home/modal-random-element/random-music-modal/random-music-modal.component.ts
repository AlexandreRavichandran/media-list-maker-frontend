import { Component } from '@angular/core';
import { AbstractRandomElementModalComponent } from '../abstract-random-element-modal.component';
import { Observable, switchMap } from 'rxjs';
import { ListElement } from 'src/app/shared/models/list/list-element';
import { MusicListService } from 'src/app/shared/services/list/music/music-list.service';
import { MusicService } from 'src/app/shared/services/music/music.service';
import { MusicListItem } from 'src/app/shared/models/list/music/music-list-item';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'mlm-random-music-modal',
  templateUrl: './random-music-modal.component.html',
  styleUrls: ['./random-music-modal.component.scss'],
  animations: [
    trigger('flash', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('1.5s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class RandomMusicModalComponent extends AbstractRandomElementModalComponent {

  override randomElement$: Observable<ListElement> = this.getRandomElement();

  constructor(
    private musicListService: MusicListService,
    private musicService: MusicService
  ) {
    super();
  }

  protected override getRandomElement(): Observable<ListElement> {
    return this.musicListService.getRandom().pipe(
      switchMap((musicListItem: MusicListItem) => {
        return this.musicService.readById(musicListItem.musicId);
      })
    );
  }

}
