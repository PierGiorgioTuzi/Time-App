import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes } from '@angular/router';
import {EmployeeCostsComponent} from "./employee-costs.component";

const routes: Routes = [
  {
    path: '',
    component: EmployeeCostsComponent
  }
];


@NgModule({
  declarations: [EmployeeCostsComponent],
  exports:[EmployeeCostsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class EmployeeCostsModule { }
