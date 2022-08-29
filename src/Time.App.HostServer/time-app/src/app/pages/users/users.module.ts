import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListsComponent } from './user-lists/user-lists.component';
import { UserFormComponent } from './user-form/user-form.component';
import {RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UserListsComponent
  }
];

@NgModule({
  declarations: [
    UserListsComponent,
    UserFormComponent
  ],
  exports: [
    UserListsComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class UsersModule { }
