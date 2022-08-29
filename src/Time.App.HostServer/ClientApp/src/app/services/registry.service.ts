import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../globals';
import { PersonalCosts } from '../models/cost-item-types.models';
import { EmployeesType } from '../models/employees-type.models';
import { CreateEmployee, Employees, UpdateEmployee } from '../models/employees.models';
import { PaginatedResponse } from '../models/paginated-response.model';
import { Roles } from '../models/role.models';
import { Sites } from '../models/sites.models';
import { RegistryTask, TasksType } from '../models/task.models';
import { User } from '../models/user.models';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class RegistryService {

  constructor(
    private http: HttpClient,
    private clientService: ClientService
  ) { }

  /* INIZIO - call AgendaType */
  getTasksType<TOut>(page: number, pageSize: number): Observable<PaginatedResponse<TOut>> {
    return this.http.get<PaginatedResponse<TOut>>(apiUrl + '/agendatype/search', this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString({ page:page, pageSize: pageSize})))
  }

  createTaskType<TOut>(param: TasksType, user: User): Observable<TOut> {
    return this.http.post<TOut>(apiUrl + '/agendatype/agendatypes', param, this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString( { userId :user.userId } )   ))
  }

  updateTaskType<TOut>(param: TasksType, user: User): Observable<TOut> {
    return this.http.put<TOut>(apiUrl + '/agendatype/agendatypes', param, this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString( {userId:user.userId } )   ))
  }

  deleteTaskType<TOut>(param: TasksType): Observable<TOut> {
    return this.http.delete<TOut>(apiUrl + '/agendatype/agendatypes', this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString({ id: param.id})) )
  }
  /* FINE - call AgendaType */

  /* INIZIO - call CostItemTypes */
  getPersonalCostList<TOut>(page: number, pageSize: number): Observable<PaginatedResponse<TOut>> {
    return this.http.get<PaginatedResponse<TOut>>(apiUrl + '/costitemtypes/search',this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString({ page:page, pageSize: pageSize})))
  }

  createPersonalCost<TOut>(param: PersonalCosts, user: User): Observable<TOut> {
    return this.http.post<TOut>(apiUrl + '/costitemtypes/costitemtypes', param, this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString( { userId :user.userId } )   ))
  }

  deletePersonalCost<TOut>(param: PersonalCosts): Observable<TOut> {
    return this.http.delete<TOut>(apiUrl + '/costitemtypes/costitemtypes', this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString({ personalCostId: param.id})) )
  }
  /* FINE - call CostItemTypes */

  /* INIZIO - call Employees */
  getEmployeesByRole<TOut>(roleId: number): Observable<any> {
    return this.http.get<TOut>(apiUrl + '/employees/byrole',this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString( {roleId: roleId } )))
  }
  /* FINE - call Employees */

  /* INIZIO - call RegistryEmployees */
  getEmployeesList<TOut>(page: number, pageSize: number): Observable<PaginatedResponse<TOut>> {
    return this.http.get<PaginatedResponse<TOut>>(apiUrl + '/registryemployees/employees/search', this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString({ page:page, pageSize: pageSize})))
  }
  
  createEmployee<TOut>(param: CreateEmployee, user: User): Observable<TOut> {
    return this.http.post<TOut>(apiUrl + '/registryemployees/employees', param, this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString( { userId :user.userId } )   ))
  }

  updateEmployee<TOut>(param: UpdateEmployee, user: User): Observable<TOut> {
    return this.http.put<TOut>(apiUrl + '/registryemployees/employees', param, this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString( {userId:user.userId } )   ))
  }

  deleteEmployee<TOut>(param: Employees): Observable<TOut> {
    return this.http.delete<TOut>(apiUrl + '/registryemployees/employees', this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString({ employeesId: param.id, email: param.user.email})) )
  }
  /* FINE - call RegistryEmployees */

  /* INIZIO - call RegistryEmployeesType */
  getEmployeesTypeList<TOut>(page:number, pageSize: number): Observable<PaginatedResponse<TOut>> {
    return this.http.get<PaginatedResponse<TOut>>(apiUrl + '/registryemployeestype/employeestype/search', this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString({ page:page, pageSize: pageSize})))
  }
  
  createEmployeeType<TOut>(param: any, user: User): Observable<TOut> {
    return this.http.post<TOut>(apiUrl + '/registryemployeestype/employeestype', param, this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString( { userId :user.userId } )   ))
  }

  updateEmployeeType<TOut>(param: any, user: User): Observable<TOut>{
    return this.http.put<TOut>(apiUrl + '/registryemployeestype/employeestype', param, this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString( {userId:user.userId } )   ))
  } 

  deleteEmployeeType<TOut>(param: EmployeesType): Observable<TOut>{
    return this.http.delete<TOut>(apiUrl + '/registryemployeestype/employeestype', this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString({ employeesTypeId: param.id})) )
  }
  /* FINE - call RegistryEmployeesType */

  /* INIZIO - call RegistryRoles */
  getRoleList<TOut>(page: number, pageSize: number): Observable<PaginatedResponse<TOut>> {
    return this.http.get<PaginatedResponse<TOut>>(apiUrl + '/registryroles/roles/search', this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString({ page:page, pageSize: pageSize})))
  }
  
  createRole<TOut>(param: Roles, user: User): Observable<TOut>{
    return this.http.post<TOut>(apiUrl + '/registryroles/roles', param, this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString( { userId :user.userId } )   ))
  }

  updateRole<TOut>(param: Roles, user: User): Observable<TOut> {
    return this.http.put<TOut>(apiUrl + '/registryroles/roles', param, this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString( {userId:user.userId } )   ))
  }

  deleteRole<TOut>(param: Roles): Observable<TOut> {
    return this.http.delete<TOut>(apiUrl + '/registryroles/roles', this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString({ roleId: param.roleId })) )
  }
  /* FINE - call RegistryRoles */

  /* INIZIO - call RegistrySites */
  getSiteList<TOut>(page: number, pageSize: number): Observable<PaginatedResponse<TOut>> {
    return this.http.get<PaginatedResponse<TOut>>(apiUrl + '/registrysites/sites/search', this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString({ page:page, pageSize: pageSize})))
  }

  createSite<TOut>(param: Roles, user: User): Observable<TOut> {
    return this.http.post<TOut>(apiUrl + '/registrysites/sites', param, this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString( { userId :user.userId } )   ))
  }

  updateSite<TOut>(param: Sites, user: User): Observable<TOut> {
    return this.http.put<TOut>(apiUrl + '/registrysites/sites', param, this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString( {userId:user.userId } )   ))
  }

  deleteSite<TOut>(param: TasksType): Observable<TOut> {
    return this.http.delete<TOut>(apiUrl + '/registrysites/sites', this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString({ siteId: param.id})) )
  }
  /* FINE - call RegistrySites */

  /* INIZIO - call RegistryTasks */
  getTasksList<TOut>(page: number, pageSize: number): Observable<PaginatedResponse<TOut>> {
    return this.http.get<PaginatedResponse<TOut>>(apiUrl + '/registrytasks/task/search',this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString({ page:page, pageSize: pageSize})))
  }

  createTask<TOut>(param: RegistryTask, user: User): Observable<TOut> {
    return this.http.post<TOut>(apiUrl + '/registrytasks/task', param, this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString( { userId :user.userId } )   ))
  }
  
  deleteTask<TOut>(param: RegistryTask): Observable<TOut> {
    return this.http.delete<TOut>(apiUrl + '/registrytasks/task', this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString({ taskId: param.taskId})) )
  }
  /* FINE - call RegistryTasks */
  

  sortDescriptionByField(object: any[], fieldToSort: string): any[] {
    object.sort(function(a, b){
      if (a[fieldToSort] < b[fieldToSort] ) { return -1; }
      if (a[fieldToSort] > b[fieldToSort] ) { return 1; }
      return 0;
    })
    return object
  }

  round(value, precision): number {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }


}
