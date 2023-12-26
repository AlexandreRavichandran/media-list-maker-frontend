import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicListItemComponent } from './music-list-item.component';
import { ListModule } from '../../list.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Testing Music list item component', () => {
  
  let component: MusicListItemComponent;
  let fixture: ComponentFixture<MusicListItemComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MusicListItemComponent],
      imports: [ListModule, AppModule]
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

});
