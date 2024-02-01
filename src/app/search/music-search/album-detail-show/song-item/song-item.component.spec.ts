import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongItemComponent } from './song-item.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SearchModule } from 'src/app/search/search.module';
import { MatIcon } from '@angular/material/icon';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

describe('Testing song item component', () => {
  let component: SongItemComponent;
  let fixture: ComponentFixture<SongItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SongItemComponent],
      imports: [
        SearchModule,
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([])
      ]

    })
      .compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(SongItemComponent);
    component = fixture.componentInstance;
    component.song = {
      title: 'title',
      apiCode: 'code',
      duration: 124,
      rank: 12,
      trackNumber: 1,
      preview: 'http://preview.com',
      artist: {
        apiCode: '1',
        name: 'Artist',
        pictureUrl: 'https://picture.com'
      }
    };

    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('should emit when clicking on music item', () => {

    spyOn(component.onSelectSongEvent, 'emit');

    const element: DebugElement = fixture.debugElement;
    const musicItemDiv: HTMLDivElement = element.query(By.css('.song__item__section')).nativeElement;

    musicItemDiv.click();
    expect(component.onSelectSongEvent.emit).toHaveBeenCalledWith(component.song);

  });

  it('should remove play button and display pause button and add class when song is selected', () => {

    component.isSongSelected = true;

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const playIcon: DebugElement = element.query(By.css('.button__play'));
    const pauseIcon: MatIcon = element.query(By.css('.button__pause')).nativeElement;
    const musicSection: HTMLDivElement = element.query(By.css('.song__item__section')).nativeElement;

    expect(playIcon).toBeNull();
    expect(pauseIcon).toBeTruthy();
    expect(musicSection.classList.contains('song__listening')).toBeTrue();

  });

  it('should remove pause button and display play button and remove class when song is unselected', () => {

    component.isSongSelected = false;

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const playIcon: MatIcon = element.query(By.css('.button__play')).nativeElement;
    const pauseIcon: DebugElement = element.query(By.css('.button__pause'));
    const musicSection: HTMLDivElement = element.query(By.css('.song__item__section')).nativeElement;

    expect(playIcon).toBeTruthy();
    expect(pauseIcon).toBeNull();
    expect(musicSection.classList.contains('song__listening')).toBeFalse();


  });

});
