import { APP_INITIALIZER, Component, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { FormsModule } from '@angular/forms';
import {SidebarModule} from 'primeng/sidebar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {AccordionModule} from 'primeng/accordion';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { TooltipModule } from "primeng/tooltip";
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {CheckboxModule} from 'primeng/checkbox';
import {MultiSelectModule} from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
import {DialogModule} from 'primeng/dialog';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ToastModule} from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { DateService } from './services/date.service';
import { RegistryService } from './services/registry.service';
import { TableModule} from 'primeng/table';
import { InputSwitchModule} from 'primeng/inputswitch';
import { InputNumberModule} from 'primeng/inputnumber';
import { OverlayPanelModule} from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { AppComponent } from './app.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AppBootstrapperService } from './core/app-bootstrapper.service';
import { DropdownModule } from 'primeng/dropdown';
import { TopBarComponent } from './layout/topbar/topbar.component';
// import ngx-translate and the http loader

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopBarComponent
  ],

  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
    }),
    AppRoutingModule,
    DropdownModule,
    BrowserAnimationsModule,
    OverlayPanelModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    SidebarModule,
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
    CalendarModule,
    RadioButtonModule,
    ToastModule,
    ConfirmDialogModule,
    InputSwitchModule,
    ToggleButtonModule,
    InputNumberModule,
    OverlayPanelModule
  ],

  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'it-IT'
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppBootstrapperService],
      useFactory: (startupClass: AppBootstrapperService) => () => startupClass.initialize()
    },
    AppComponent,
    HttpClient,
    TranslateService,
    MessageService,
    ConfirmationService,
    Location,
    RegistryService,
    DateService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
  
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}

