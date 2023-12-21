import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { MusicListHomeComponent } from './music-list-home.component';
import { MusicListItem } from 'src/app/shared/models/list/music/music-list-item';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { MusicListService } from 'src/app/shared/services/list/music/music-list.service';
import { ListModule } from '../../list.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('Testing Music list item component', () => {

  let component: MusicListHomeComponent;
  let fixture: ComponentFixture<MusicListHomeComponent>;
  let mockMusicListService: jasmine.SpyObj<MusicListService>;

  beforeEach(async () => {

    mockMusicListService = jasmine.createSpyObj('MusicListService', ['browseLatest']);

    await TestBed.configureTestingModule({
      declarations: [MusicListHomeComponent],
      imports: [ListModule, RouterTestingModule],
      providers: [{ provide: MusicListService, useValue: mockMusicListService }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicListHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user latest music list', () => {

    const datas: MusicListItem[] = [
      {
        id: 1,
        musicId: 1,
        appUserId: 1,
        addedAt: new Date(),
        sortingNumber: 1,
        musicDetail: undefined
      },
      {
        id: 2,
        musicId: 1,
        appUserId: 1,
        addedAt: new Date(),
        sortingNumber: 2,
        musicDetail: undefined
      },
      {
        id: 3,
        musicId: 1,
        appUserId: 1,
        addedAt: new Date(),
        sortingNumber: 3,
        musicDetail: undefined
      }
    ];

    component.userMusicList$ = of(datas);

    fixture.detectChanges();

    const musicSection: DebugElement = fixture.nativeElement.querySelector('.list__musics__section');
    const musicItems: DebugElement[] = fixture.nativeElement.querySelectorAll('.music__item');
    const emptyMusicSection: DebugElement = fixture.nativeElement.querySelector('.list__music__empty__section');


    expect(musicSection).toBeTruthy();
    expect(emptyMusicSection).toBeNull();
    expect(musicItems.length).toEqual(datas.length);

  });

  it('should display empty music list section if latest music list is empty', () => {

    component.userMusicList$ = of([]);

    fixture.detectChanges();

    const musicSection: DebugElement = fixture.nativeElement.querySelector('.list__musics__section');
    const emptyMusicSection: DebugElement = fixture.nativeElement.querySelector('.list__music__empty__section');

    expect(musicSection).toBeNull();
    expect(emptyMusicSection).toBeTruthy();

  });

});
