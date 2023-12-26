import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MusicListItem } from 'src/app/shared/models/list/music/music-list-item';

@Component({
  selector: 'mlm-music-list-item',
  templateUrl: './music-list-item.component.html',
  styleUrls: ['./music-list-item.component.scss']
})
export class MusicListItemComponent {

  @Input()
  musicItem!: MusicListItem;

  constructor(private router: Router) { }

  onClickDetails(): void {
    this.router.navigate(['/search/albums/', this.musicItem.musicDetail?.apiCode]);
  }

}
