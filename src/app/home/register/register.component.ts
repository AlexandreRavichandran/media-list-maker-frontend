import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiError } from 'src/app/shared/error/api-error';
import { AuthResponse } from 'src/app/shared/models/auth/auth-response';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private authService: AuthService, private router: Router) { }

  registerForm: FormGroup = this.authService.generateRegisterForm();
  apiError: ApiError | null = null;
  isLoading: boolean = false;

  isFormValid(): boolean {
    return this.registerForm.valid;
  }

  attemptRegistration(): void {

    if (this.isFormValid() === false) {
      return;
    }

    this.isLoading = true;

    this.authService.register(this.registerForm.value).subscribe({
      next: (token: AuthResponse) => {
        sessionStorage.setItem('token', token.token);
        this.isLoading = false;
        this.router.navigate(['me']);
      },
      error: (error: ApiError) => {
        this.isLoading = false;
        this.apiError = error;
      }
    });
  }

}
