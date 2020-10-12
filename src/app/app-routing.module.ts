import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_helpers/auth.guard';
import { AdminGuard } from './_helpers/admin.guard';
import { PageNotFoundComponent } from './site-framework/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '',
    redirectTo: '/s', pathMatch: 'full' },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canActivate: [AdminGuard] },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard] },
  { path: 's', loadChildren: () => import('./start-page/start-page.module').then(m => m.StartPageModule) },
  { path: '**', component: PageNotFoundComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
