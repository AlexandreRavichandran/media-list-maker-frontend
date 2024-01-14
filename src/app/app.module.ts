import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './shared/interceptor/auth.interceptor';
import { LoginComponent } from './home/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './home/register/register.component';
import { StoreModule } from '@ngrx/store';
import { appUserReducer } from './home/state/reducers/app-user.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppUserEffects } from './home/state/effects/app-user.effects';
import { Features } from './shared/constants/features.enum';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(Features.AppUser, appUserReducer),
    EffectsModule.forFeature([AppUserEffects])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
