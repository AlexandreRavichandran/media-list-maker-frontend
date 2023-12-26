import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicListShowComponent } from './music-list-show.component';
import { ListModule } from '../../list.module';
import { AppModule } from 'src/app/app.module';

describe('Testing music list show component', () => {
  let component: MusicListShowComponent;
  let fixture: ComponentFixture<MusicListShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MusicListShowComponent],
      imports: [ListModule, AppModule]
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

});
