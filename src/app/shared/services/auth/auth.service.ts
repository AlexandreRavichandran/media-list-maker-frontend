import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from '../abstract-service.services';
import { AuthRequest } from '../../models/auth/auth-request';
import { AuthResponse } from '../../models/auth/auth-response';
import { Observable } from 'rxjs';
import { AppUser } from '../../models/appuser/appuser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isPasswordConfirmationValid } from '../../validator/core-validators';

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

  public getAuthenticatedUserToken(): string | null {
    return sessionStorage.getItem('token');
  }

  public logout(): void {
    return sessionStorage.removeItem('token');
  }

  public getUsername():string {
    
    const username:string | null = sessionStorage.getItem('username');

    if(username === null) {
      return '';
    }

    return username;

  }

  public generateLoginForm(): FormGroup {

    return new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });

  }

  public generateRegisterForm(): FormGroup {

    return new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      passwordConfirmation: new FormControl(null, [Validators.required])
    }, { validators: isPasswordConfirmationValid });

  }
}
