import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeCostsComponent } from "./employee-costs.component";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { ToggleButton, ToggleButtonModule } from 'primeng/togglebutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CellEditor, TableModule } from 'primeng/table';
import { TopBarComponent } from 'src/app/layout/topbar/topbar.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';

const routes: Routes = [
  {
    path: '',
    component: EmployeeCostsComponent
  }
];


@NgModule({
  declarations: [
    EmployeeCostsComponent,
    TopBarComponent
  ],
  exports:[
    EmployeeCostsComponent,
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    ConfirmDialogModule,
    CommonModule,
    CheckboxModule,
    DialogModule,
    FormsModule,
    RouterModule.forChild(routes),
    ToastModule,
    TableModule,
    PaginatorModule,
    CalendarModule,
    MultiSelectModule,
    InputNumberModule,
    ToggleButtonModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
    }),
  ]
})

export class EmployeeCostsModule { }
