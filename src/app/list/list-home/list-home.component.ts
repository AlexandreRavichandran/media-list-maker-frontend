import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RandomMovieModalComponent } from './modal-random-element/random-movie-modal/random-movie-modal.component';
import { AbstractRandomElementModalComponent } from './modal-random-element/abstract-random-element-modal.component';
import { ComponentType } from '@angular/cdk/portal';
import { SearchTypeConstants } from 'src/app/shared/constants/search-type.constants';
import { RandomMusicModalComponent } from './modal-random-element/random-music-modal/random-music-modal.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mlm-list-home',
  templateUrl: './list-home.component.html',
  styleUrls: ['./list-home.component.scss']
})
export class ListHomeComponent {

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) { }


  openRandomElementModal(elementId: number): void {

    const selectedModal: ComponentType<AbstractRandomElementModalComponent> = this.getModalComponentByElementId(elementId);

    this.dialog.open(selectedModal, {
      panelClass: "element__modal",
      height: "700px",
      width: "650px",
      data: {
        elementId: elementId
      }
    });
  }

  private getModalComponentByElementId(elementId: number): ComponentType<AbstractRandomElementModalComponent> {

    switch (elementId) {
      case SearchTypeConstants.TYPE_ALBUM.value:
        return RandomMusicModalComponent;

      case SearchTypeConstants.TYPE_MOVIE.value:
        return RandomMovieModalComponent;
    }

    return RandomMovieModalComponent;

  }

  public getUsername(): string {
    return this.authService.getUsername();
  }

  public onLogout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }

}
