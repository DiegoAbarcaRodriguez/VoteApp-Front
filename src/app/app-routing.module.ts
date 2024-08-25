import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth/layout/auth-layout.component';
import { DashboardLayoutComponent } from './dashboard/layout/dashboard-layout.component';
import { PublicGuard } from './shared/guards/public.guard';
import { DashboardGuard } from './shared/guards/dashboard.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [PublicGuard]
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [DashboardGuard]
  },
  {
    path: '*',
    redirectTo: 'dashboard'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
