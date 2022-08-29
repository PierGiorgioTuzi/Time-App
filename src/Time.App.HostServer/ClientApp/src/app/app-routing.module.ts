import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InsertControlComponent } from './pages/insert-control/insert-control.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistryComponent } from './pages/registry/registry.component';
import { RegistryTablesComponent } from './pages/registry-tables/registry-tables.component';
import { StaffPriceComponent } from './pages/staff-price/staff-price.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'registry', component: RegistryComponent },
  { path: 'registry-tables', component: RegistryTablesComponent },
  { path: 'staff-price', component: StaffPriceComponent },
  { path: 'insert-control', component: InsertControlComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
