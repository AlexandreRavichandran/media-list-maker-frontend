import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationNeededGuard } from './shared/guard/auth/authentication-needed.guard';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { NoAuthNeededGuard } from './shared/guard/auth/no-auth-needed.guard';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthNeededGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthNeededGuard] },
  { path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule) },
  { path: 'me', loadChildren: () => import('./list/list.module').then(m => m.ListModule), canLoad: [AuthenticationNeededGuard] },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
