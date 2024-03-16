import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMenuComponent } from './nav-menu.component';
import { AppModule } from 'src/app/app.module';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

describe('Testing nav menu component', () => {

  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {

    mockAuthService = jasmine.createSpyObj('AuthService', ['logout', 'isUserLogged']);

    await TestBed.configureTestingModule({
      declarations: [NavMenuComponent],
      imports: [
        AppModule
      ],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout and redirect to home page', () => {

    const navigateSpy = spyOn(router, 'navigate');

    component.onLogout();

    expect(navigateSpy).toHaveBeenCalledWith(['']);

  });

});
