import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCanLoadGuard } from './shared/guard/auth/auth.can-load.guard';
import { LoginComponent } from './home/login/login.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './home/register/register.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule) },
  { path: 'me', loadChildren: () => import('./list/list.module').then(m => m.ListModule), canLoad: [AuthCanLoadGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
