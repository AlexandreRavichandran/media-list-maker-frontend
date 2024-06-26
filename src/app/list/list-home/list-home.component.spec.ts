import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHomeComponent } from './list-home.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SearchTypeConstants } from 'src/app/shared/constants/search-type.constants';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RandomMovieModalComponent } from './modal-random-element/random-movie-modal/random-movie-modal.component';
import { RandomMusicModalComponent } from './modal-random-element/random-music-modal/random-music-modal.component';
import { ListModule } from '../list.module';
import { AppModule } from 'src/app/app.module';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';

describe('Testing List home component', () => {
  let component: ListHomeComponent;
  let fixture: ComponentFixture<ListHomeComponent>;
  let dialog: MatDialog;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {

    mockAuthService = jasmine.createSpyObj('AuthService', ['getUsername', 'logout', 'isUserLogged']);

    await TestBed.configureTestingModule({
      declarations: [ListHomeComponent],
      imports: [MatDialogModule, BrowserAnimationsModule, HttpClientModule, ListModule, AppModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: AuthService, useValue: mockAuthService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open movie modal component when element id is movie id', () => {

    spyOn(dialog, 'open').and.callThrough();

    component.openRandomElementModal(SearchTypeConstants.TYPE_MOVIE.value);


    expect(dialog.open).toHaveBeenCalledWith(RandomMovieModalComponent, {
      panelClass: "element__modal",
      height: "700px",
      width: "650px",
      data: {
        elementId: SearchTypeConstants.TYPE_MOVIE.value
      }
    });

  });

  it('should open music modal component when element id is music id', () => {

    spyOn(dialog, 'open').and.callThrough();

    component.openRandomElementModal(SearchTypeConstants.TYPE_ALBUM.value);


    expect(dialog.open).toHaveBeenCalledWith(RandomMusicModalComponent, {
      panelClass: "element__modal",
      height: "700px",
      width: "650px",
      data: {
        elementId: SearchTypeConstants.TYPE_ALBUM.value
      }
    });

  });

  it('should open movie modal component when element id is unknown', () => {

    spyOn(dialog, 'open').and.callThrough();

    component.openRandomElementModal(3);


    expect(dialog.open).toHaveBeenCalledWith(RandomMovieModalComponent, {
      panelClass: "element__modal",
      height: "700px",
      width: "650px",
      data: {
        elementId: 3
      }
    });

  });

  it('should logout and redirect to home', () => {

    const navigateSpy = spyOn(router, 'navigate');

    component.onLogout();

    expect(mockAuthService.logout).toHaveBeenCalled();

    expect(navigateSpy).toHaveBeenCalledWith(['']);

  });

});
