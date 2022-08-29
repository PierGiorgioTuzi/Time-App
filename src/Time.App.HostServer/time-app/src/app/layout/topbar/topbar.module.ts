import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopBarComponent } from './topbar.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';

const routes: Routes = [
  {
    path: '',
    component: TopBarComponent
  }
];


@NgModule({
  declarations: [
    TopBarComponent,
    SidebarComponent
  ],
  exports:[
    TopBarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DropdownModule,
    SidebarModule,
    OverlayPanelModule,
    RouterModule.forChild(routes),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
    }),
  ]
})

export class TopBarModule { }
