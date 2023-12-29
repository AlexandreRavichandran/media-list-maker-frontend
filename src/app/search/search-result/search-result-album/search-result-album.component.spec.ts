import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultAlbumComponent } from './search-result-album.component';
import { Router } from '@angular/router';
import { SearchModule } from '../../search.module';
import { AppModule } from 'src/app/app.module';
import { AlbumSearchList } from 'src/app/shared/models/music/search/album/album-search-list';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Testing search result album component', () => {

  let component: SearchResultAlbumComponent;
  let fixture: ComponentFixture<SearchResultAlbumComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultAlbumComponent],
      imports: [SearchModule, AppModule]
    })
      .compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(SearchResultAlbumComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to album detail when click on album item', () => {

    const searchResults: AlbumSearchList = {
      totalResults: 1,
      searchResults: [
        {
          apiCode: 'test',
          artist: {
            apiCode: 'test',
            name: 'artist',
            pictureUrl: 'https://picture.com'
          },
          title: 'Title',
          pictureUrl: 'https://picture.com'
        }
      ]
    };

    component.searchResults = searchResults;

    const navigateSpy = spyOn(router, 'navigate');

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const albumElement: HTMLDivElement = element.query(By.css('.album__element')).nativeElement;

    albumElement.click();

    expect(navigateSpy).toHaveBeenCalled();

  });

});
