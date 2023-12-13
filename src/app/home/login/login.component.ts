import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  loginForm: FormGroup = this.authService.generateLoginForm();

  attemptAuth(): void {
    console.log("attempt")
  }

  isFormValid(): boolean {
    return this.loginForm.valid;
  }
}
