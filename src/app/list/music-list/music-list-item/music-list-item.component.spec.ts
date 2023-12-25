import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicListItemComponent } from './music-list-item.component';
import { ListModule } from '../../list.module';
import { SharedModule } from 'src/app/shared/shared.module';

describe('Testing Music list item component', () => {
  let component: MusicListItemComponent;
  let fixture: ComponentFixture<MusicListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MusicListItemComponent],
      imports: [ListModule, SharedModule]
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
      musicDetail: undefined
    };


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
