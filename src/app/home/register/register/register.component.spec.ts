import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AppModule } from 'src/app/app.module';

describe('Testing Register component', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [AppModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate register form', () => {

    expect(component.registerForm.contains('username')).toBeTrue();
    expect(component.registerForm.contains('password')).toBeTrue();
    expect(component.registerForm.contains('passwordConfirmation')).toBeTrue();

  });

  it('should disable register button when form is invalid', () => {

    component.registerForm.controls['username'].setValue('username');
    expect(component.isFormValid()).toBeFalse();

  });

  it('should enable register button when form is valid', () => {

    component.registerForm.controls['username'].setValue('username');
    component.registerForm.controls['password'].setValue('password');
    component.registerForm.controls['passwordConfirmation'].setValue('password');

    expect(component.isFormValid()).toBeTrue();

  });

});
