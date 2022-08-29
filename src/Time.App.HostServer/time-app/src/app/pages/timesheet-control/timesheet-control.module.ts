import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesheetControlComponent } from "./timesheet-control.component";
import { RouterModule, Routes } from '@angular/router';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppModule, HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ButtonModule } from 'primeng/button';
import { Calendar } from '@fullcalendar/core';
import { CalendarModule } from 'primeng/calendar';

const routes: Routes = [
  {
    path: '',
    component: TimesheetControlComponent
  }
];

@NgModule({

  declarations: [
    TimesheetControlComponent
  ],

  exports: [
    TimesheetControlComponent,

  ],

  imports: [
    AppModule,
    BrowserModule, 
    ButtonModule,
    CalendarModule,
    FormsModule,
    ToggleButtonModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
    }),
    CommonModule,
    MultiSelectModule,
    TableModule,
    RouterModule.forChild(routes),
  ]

})

export class TimeshettControl {
}
