import { Injectable } from '@angular/core';
import { AbstractService } from '../../abstract-service.services';
import { ApiServiceConstants } from 'src/app/shared/constants/api-service-constants';
import { AlbumDetails } from 'src/app/shared/models/music/search/album/album-details';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ArtistRelatedAlbum } from 'src/app/shared/models/artist/artist-related-albums';

@Injectable({
  providedIn: 'root'
})
export class ArtistService extends AbstractService {

  constructor(private http: HttpClient) {
    super(ApiServiceConstants.SERVICE_MUSIC);
  }

  public browseAlbumByArtistApiCode(artistApiCode: string): Observable<ArtistRelatedAlbum> {
    return this.http.get<ArtistRelatedAlbum>(`${this.getResourceUrl()}/deezerapi/artists/${artistApiCode}/albums`);
  }
}
