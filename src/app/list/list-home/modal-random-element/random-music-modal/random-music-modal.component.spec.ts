import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomMusicModalComponent } from './random-music-modal.component';
import { ListModule } from 'src/app/list/list.module';

describe('Testing random music modal component', () => {
  let component: RandomMusicModalComponent;
  let fixture: ComponentFixture<RandomMusicModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RandomMusicModalComponent],
      imports: [ListModule]
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
