import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomMusicModalComponent } from './random-music-modal.component';
import { ListModule } from 'src/app/list/list.module';
import { MusicService } from 'src/app/shared/services/music/music.service';
import { MusicListService } from 'src/app/shared/services/list/music/music-list.service';
import { MusicListItem } from 'src/app/shared/models/list/music/music-list-item';
import { Music } from 'src/app/shared/models/music/music';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef } from '@angular/material/dialog';

describe('Testing random music modal component', () => {
  let component: RandomMusicModalComponent;
  let fixture: ComponentFixture<RandomMusicModalComponent>;
  let mockMusicService: jasmine.SpyObj<MusicService>;
  let mockMusicListService: jasmine.SpyObj<MusicListService>;
  let musicListMock: any;
  let musicMock: any;

  beforeEach(async () => {

    mockMusicService = jasmine.createSpyObj('MusicService', ['readById']);
    mockMusicListService = jasmine.createSpyObj('MusicListService', ['getRandom']);


    await TestBed.configureTestingModule({
      declarations: [RandomMusicModalComponent],
      imports: [ListModule, BrowserAnimationsModule],
      providers: [
        { provide: MusicService, useValue: mockMusicService },
        { provide: MusicListService, useValue: mockMusicListService },
        { provide: MatDialogRef, useValue: {} },
      ],
    })
      .compileComponents();

    const musicList: MusicListItem = {
      id: 1,
      musicId: 2,
      addedAt: new Date(),
      appUserId: 1,
      sortingOrder: 1,
      musicDetail: undefined
    }

    const music: Music = {
      id: 1,
      apiCode: '001',
      pictureUrl: 'http://www.google.com',
      releasedAt: 2011,
      title: 'Music 1',
      artistName: 'Artist',
      type: 2
    }

    musicListMock = mockMusicListService.getRandom.and.returnValue(of(musicList));

    musicMock = mockMusicService.readById.and.returnValue(of(music));

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomMusicModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get random music when click on button', () => {

    component.generateNewRandomElement();

    expect(musicListMock).toHaveBeenCalled();
    expect(musicMock).toHaveBeenCalled();

  });



});
