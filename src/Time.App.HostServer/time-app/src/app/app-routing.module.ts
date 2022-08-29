import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(_ => _.LoginModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(_ => _.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'employee-costs',
    //loadChildren: () => import('./pages/employee-costs/employee-costs.module').then(_ => _.EmployeeCostsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'insert-control',
    loadChildren: () => import('./pages/timesheet-control/timesheet-control.module').then(_ => _.TimeshettControl),
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then(_ => _.UsersModule),
    canActivate: [AuthGuard]
  },
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
