import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './shared/guard/authentication.guard';

const routes: Routes = [
  { path: '', },
  { path: 'login' },
  { path: 'register' },
  { path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule) },
  { path: 'me', loadChildren: () => import('./list/list.module').then(m => m.ListModule), canLoad: [AuthenticationGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
