import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomMusicModalComponent } from './random-music-modal.component';

describe('RandomMusicModalComponent', () => {
  let component: RandomMusicModalComponent;
  let fixture: ComponentFixture<RandomMusicModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomMusicModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomMusicModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
