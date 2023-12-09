import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from '../abstract-service.services';
import { AuthRequest } from '../../models/auth/auth-request';
import { AuthResponse } from '../../models/auth/auth-response';
import { Observable } from 'rxjs';
import { AppUser } from '../../models/appuser/appuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AbstractService {

  constructor(private http: HttpClient) {
    super('');
  }

  public login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.getResourceUrl()}/login`, credentials);
  }

  public register(user: AppUser): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.getResourceUrl()}/register`, user);
  }

}
