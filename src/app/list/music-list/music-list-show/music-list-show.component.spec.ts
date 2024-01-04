import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicListShowComponent } from './music-list-show.component';
import { ListModule } from '../../list.module';
import { AppModule } from 'src/app/app.module';
import { MusicListService } from 'src/app/shared/services/list/music/music-list.service';
import { MusicListItem } from 'src/app/shared/models/list/music/music-list-item';
import { of } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MovieListItem } from 'src/app/shared/models/list/movie/movie-list-item';

describe('Testing music list show component', () => {

  let component: MusicListShowComponent;
  let fixture: ComponentFixture<MusicListShowComponent>;
  let mockMusicListService: jasmine.SpyObj<MusicListService>;

  beforeEach(async () => {

    mockMusicListService = jasmine.createSpyObj('MusicListService', ['browse', 'editSortingOrder']);

    await TestBed.configureTestingModule({
      declarations: [MusicListShowComponent],
      imports: [ListModule, AppModule],
      providers: [
        {
          provide: MusicListService,
          useValue: mockMusicListService
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicListShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call browse music list when on refresh event', () => {

    const musicList: MusicListItem[] = [
      {
        id: 1,
        musicId: 1,
        appUserId: 1,
        addedAt: new Date(),
        musicDetail: undefined,
        sortingOrder: 1
      }
    ]

    const browseSpy = mockMusicListService.browse.and.returnValue(of(musicList));

    component.onRefreshList();

    expect(browseSpy).toHaveBeenCalled();

  });

  it('should update order when drag and drop an item on user music list', () => {

    const musicList: MusicListItem[] = [
      {
        id: 1,
        musicId: 1,
        appUserId: 1,
        addedAt: new Date(),
        musicDetail: undefined,
        sortingOrder: 1
      },
      {
        id: 2,
        musicId: 2,
        appUserId: 1,
        addedAt: new Date(),
        musicDetail: undefined,
        sortingOrder: 2
      }
    ]

    const dragNdropEvent = {
      currentIndex: 0,
      previousIndex: 1,
      container: {
        data: [
          {
            id: 1,
            musicId: 1,
            appUserId: 1,
            addedAt: new Date(),
            musicDetail: undefined,
            sortingOrder: 1
          },
          {
            id: 2,
            musicId: 2,
            appUserId: 1,
            addedAt: new Date(),
            musicDetail: undefined,
            sortingOrder: 2
          }
        ]
      }
    }

    const browseSpy = mockMusicListService.editSortingOrder.and.returnValue(of(musicList));

    component.onItemDragnDropped(dragNdropEvent as CdkDragDrop<MusicListItem[]>);

    expect(browseSpy).toHaveBeenCalled();

  });

});
