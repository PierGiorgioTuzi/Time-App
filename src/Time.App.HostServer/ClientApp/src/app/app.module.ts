import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import {SidebarModule} from 'primeng/sidebar';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {AccordionModule} from 'primeng/accordion';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { TooltipModule } from "primeng/tooltip";
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TopBarComponent } from './pages/topbar/topbar.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import {CheckboxModule} from 'primeng/checkbox';
import {MultiSelectModule} from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
import {DialogModule} from 'primeng/dialog';
import { EventFormComponent } from './pages/event-form/event-form.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { RIAutoCompleteModule } from '@ri/primeng-ri/ri-autocomplete';
import {CalendarModule} from 'primeng/calendar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ToastModule} from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { RegistryComponent } from './pages/registry/registry.component';
import { DateService } from './services/date.service';
import { RegistryTablesComponent } from './pages/registry-tables/registry-tables.component';
import { RegistryService } from './services/registry.service';
import {TableModule} from 'primeng/table';
import { RegistryTablesFormComponent } from './pages/registry-tables-form/registry-tables-form.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import { StaffPriceComponent } from './pages/staff-price/staff-price.component';
import {InputNumberModule} from 'primeng/inputnumber';
import { InsertControlComponent } from './pages/insert-control/insert-control.component';
import { InsertControlService } from './services/insert-control.service';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'registry', component: RegistryComponent },
  { path: 'registry-tables', component: RegistryTablesComponent },
  { path: 'staff-price', component: StaffPriceComponent },
  { path: 'insert-control', component: InsertControlComponent },
  { path: '**', redirectTo: 'home' }
];


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TopBarComponent,
    SidebarComponent,
    EventFormComponent,
    RegistryComponent,
    RegistryTablesComponent,
    RegistryTablesFormComponent,
    StaffPriceComponent,
    InsertControlComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    OverlayPanelModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    SidebarModule,
    FullCalendarModule,
    PaginatorModule,
    HttpClientModule,
    AccordionModule,
    ProgressSpinnerModule,
    TooltipModule,
    CheckboxModule,
    CommonModule,
    MultiSelectModule,
    DialogModule,
    TableModule,
    AutoCompleteModule,
    RIAutoCompleteModule,
    CalendarModule,
    RadioButtonModule,
    ToastModule,
    ConfirmDialogModule,
    InputSwitchModule,
    ToggleButtonModule,
    InputNumberModule
  ],
  providers: [
    AppComponent,
    HttpClient,
    TranslateService,
    MessageService,
    ConfirmationService,
    Location,
    RegistryService,
    DateService,
    InsertControlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
