import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongListComponent } from './song-list.component';
import { SongDetails } from 'src/app/shared/models/music/search/song/song-details';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Testing song list component', () => {
  let component: SongListComponent;
  let fixture: ComponentFixture<SongListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SongListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(SongListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('should update selected song', () => {

    const song: SongDetails = {
      title: 'title',
      apiCode: 'code',
      duration: 124,
      rank: 12,
      trackNumber: 1,
      preview: 'http://preview.com/',
      artist: {
        id: '1',
        name: 'Artist'
      }
    }

    component.changeSelectedSong(song);

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const audioTitle: HTMLParagraphElement = element.query(By.css('.audio__name')).nativeElement;
    const audioElement: HTMLAudioElement = element.query(By.css('.audio__item')).nativeElement;

    expect(audioTitle.textContent).toEqual(song.trackNumber.toString() + '.' + song.title);
    expect(audioElement.src).toEqual(song.preview);

  });

});
