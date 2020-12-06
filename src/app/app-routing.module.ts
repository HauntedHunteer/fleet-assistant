import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_helpers/auth.guard';
import { PageNotFoundComponent } from './site-framework/page-not-found/page-not-found.component';
import { SourceMaterialsComponent } from './site-framework/source-materials/source-materials.component';
import { AuthorsComponent } from './site-framework/authors/authors.component';

const routes: Routes = [
  { path: '',
    redirectTo: '/s', pathMatch: 'full' },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard] },
  { path: 's', loadChildren: () => import('./start-page/start-page.module').then(m => m.StartPageModule) },
  { path: 'source', component: SourceMaterialsComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: '**', component: PageNotFoundComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
