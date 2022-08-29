import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimesheetControlComponent} from "./timesheet-control.component";
import {RouterModule, Routes} from '@angular/router';
import { MultiSelectModule } from 'primeng/multiselect';

const routes: Routes = [
  {
    path: '',
    component: TimesheetControlComponent
  }
];


@NgModule({
  declarations: [TimesheetControlComponent],
  exports: [TimesheetControlComponent],
  imports: [
    CommonModule,
    MultiSelectModule,
    RouterModule.forChild(routes),
  ]
})
export class TimeshettControl {
}
