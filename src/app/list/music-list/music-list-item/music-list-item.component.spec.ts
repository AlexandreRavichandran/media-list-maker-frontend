import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicListItemComponent } from './music-list-item.component';
import { ListModule } from '../../list.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MusicListItem } from 'src/app/shared/models/list/music/music-list-item';
import { MusicListService } from 'src/app/shared/services/list/music/music-list.service';
import { of } from 'rxjs';

describe('Testing Music list item component', () => {
  
  let component: MusicListItemComponent;
  let fixture: ComponentFixture<MusicListItemComponent>;
  let router: Router;
  let mockMusicListService: jasmine.SpyObj<MusicListService>;

  beforeEach(async () => {

    mockMusicListService = jasmine.createSpyObj('MusicListService', ['deleteById']);

    await TestBed.configureTestingModule({
      declarations: [MusicListItemComponent],
      imports: [ListModule, AppModule, SharedModule],
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
    fixture = TestBed.createComponent(MusicListItemComponent);
    component = fixture.componentInstance;

    fixture.componentInstance.musicItem = {
      id: 1,
      musicId: 1,
      appUserId: 1,
      addedAt: new Date(),
      sortingOrder: 1,
      musicDetail: {
        id: 1,
        type: 1,
        apiCode: 'code',
        title: 'title',
        releasedAt: 2020,
        artistName: 'Artist',
        pictureUrl: 'http://url.com'
      }
    };

    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to music detail when clicking on music item', () => {

    const navigateSpy = spyOn(router, 'navigate');

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const musicItemDivElement: HTMLDivElement = element.query(By.css('.item__music__section')).nativeElement;

    musicItemDivElement.click();

    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/search/albums/', fixture.componentInstance.musicItem.musicDetail?.apiCode]);

  });

  it('should call delete by id and emit on refresh event when clicking on delete icon', () => {

    spyOn(component.onDeleteItemEvent, 'emit');

    const deletedMusic: MusicListItem = {
      id: 1,
      musicId: 1,
      appUserId: 1,
      addedAt: new Date(),
      musicDetail: undefined,
      sortingOrder: 1
    }

    component.isDeletable = true;

    fixture.detectChanges();

    const deleteByIdSpy = mockMusicListService.deleteById.and.returnValue(of(deletedMusic));

    const element: DebugElement = fixture.debugElement;
    const deleteButton: HTMLElement = element.query(By.css('.music__delete__button')).nativeElement;

    deleteButton.click();

    expect(deleteByIdSpy).toHaveBeenCalled();
    expect(component.onDeleteItemEvent.emit).toHaveBeenCalled();

  });

});
