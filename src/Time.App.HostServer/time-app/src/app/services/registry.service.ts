import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings, AppSettingsService } from '../core/app-settings.service';
import { PersonalCosts } from '../models/cost-item-types.models';
import { EmployeesType } from '../models/employees-type.models';
import { SearchIdNameStaffPrice, StaffPrice } from '../models/employees-yearly-cost.models';
import { CreateEmployee, Employees, UpdateEmployee } from '../models/employees.models';
import { InsertControlList } from '../models/insert-control.models';
import { Roles } from '../models/role.models';
import { Sites } from '../models/sites.models';
import { RegistryTask, TasksType } from '../models/task.models';
import { User } from '../models/user.models';
import { BaseClient } from './base-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class RegistryService {

  private readonly apiUrl: string;

  constructor(
    private client: BaseClient,
    private http: HttpClient,
    private settings: AppSettingsService,
  ) { 
    this.apiUrl = settings.configurationApiUrl();
  }

  /* INIZIO - call AgendaType */
  getTasksType<TOut>(): Observable<TOut> {
    return this.http.get<TOut>(this.apiUrl + '/agendatype/search', { })
  }

  createTaskType<TOut>(param: TasksType, user: User): Observable<TOut> {
    return this.http.post<TOut>(this.apiUrl + '/agendatype/agendatypes', param, this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString( { userId :user.userId } )   ))
  }

  updateTaskType<TOut>(param: TasksType, user: User): Observable<TOut> {
    return this.http.put<TOut>(this.apiUrl + '/agendatype/agendatypes', param, this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString( {userId:user.userId } )   ))
  }

  deleteTaskType<TOut>(param: TasksType): Observable<TOut> {
    return this.http.delete<TOut>(this.apiUrl + '/agendatype/agendatypes', this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString({ id: param.id})) )
  }
  /* FINE - call AgendaType */

  /* INIZIO - call CostItemTypes */

  getCostItemTypesList<TOut>(): Observable<TOut> {
    return this.http.get<TOut>(this.apiUrl + '/costitemtypes/search', {})
  }

  getPersonalCostList<TOut>(): Observable<TOut[]> {
    return this.http.get<TOut[]>(this.apiUrl + '/costitemtypes/search', {})
  }

  createPersonalCost<TOut>(param: PersonalCosts, user: User): Observable<TOut> {
    return this.http.post<TOut>(this.apiUrl + '/costitemtypes/costitemtypes', param, this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString( { userId :user.userId } )   ))
  }

  deletePersonalCost<TOut>(param: PersonalCosts): Observable<TOut> {
    return this.http.delete<TOut>(this.apiUrl + '/costitemtypes/costitemtypes', this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString({ personalCostId: param.id})) )
  }
  /* FINE - call CostItemTypes */

  /* INIZIO - call Employees */
  getEmployerList<TOut>(): Observable<TOut> {
    return this.http.get<TOut>(this.apiUrl + '/employees/search', { })
  }

  getEmployeesByRole<TOut>(roleId: number): Observable<any> {
    return this.http.get<TOut>(this.apiUrl + '/employees/byrole',this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString( {roleId: roleId } )))
  }
  /* FINE - call Employees */

  /* INIZIO - call EmployeeYearlyCosts */
   getStaffPriceList<TOut>(filter: SearchIdNameStaffPrice): Observable<TOut> {
    return this.http.get<TOut>(this.apiUrl + '/eycos/search', this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString(filter)))
  }

  updateStaffPrice<TOut>(param: StaffPrice, user: User): Observable<TOut> {
    return this.http.put<TOut>(this.apiUrl + '/eycos', param, this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString({ userId: user.userId })))
  }

  uploadExcel<TOut>(year: number, file: any, user: User): Observable<TOut> {
    const data: FormData = new FormData();
    data.append('file', file, file.name);
    return this.http.post<TOut>(this.apiUrl + '/import-excel', data, this.client.buildHttpOptionsWithHttpFormData(this.client.buildQueryString({ year: year, user: user.userId })))
  }
   /* FINE - call EmployeeYearlyCosts */

  /* INIZIO - call RegistryEmployees */
  getEmployeesList<TOut>(): Observable<TOut[]> {
    return this.http.get<TOut[]>(this.apiUrl + '/registryemployees/employees/search', { })
  }
  
  createEmployee<TOut>(param: CreateEmployee, user: User): Observable<TOut> {
    return this.http.post<TOut>(this.apiUrl + '/registryemployees/employees', param, this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString( { userId :user.userId } )   ))
  }

  updateEmployee<TOut>(param: UpdateEmployee, user: User): Observable<TOut> {
    return this.http.put<TOut>(this.apiUrl + '/registryemployees/employees', param, this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString( {userId:user.userId } )   ))
  }

  deleteEmployee<TOut>(param: Employees): Observable<TOut> {
    return this.http.delete<TOut>(this.apiUrl + '/registryemployees/employees', this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString({ employeesId: param.id, email: param.user.email})) )
  }
  /* FINE - call RegistryEmployees */

  /* INIZIO - call RegistryEmployeesType */
  getEmployeesTypeList<TOut>(): Observable<TOut[]> {
    return this.http.get<TOut[]>(this.apiUrl + '/registryemployeestype/employeestype/search', { })
  }
  
  createEmployeeType<TOut>(param: any, user: User): Observable<TOut> {
    return this.http.post<TOut>(this.apiUrl + '/registryemployeestype/employeestype', param, this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString( { userId :user.userId } )   ))
  }

  updateEmployeeType<TOut>(param: any, user: User): Observable<TOut>{
    return this.http.put<TOut>(this.apiUrl + '/registryemployeestype/employeestype', param, this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString( {userId:user.userId } )   ))
  } 

  deleteEmployeeType<TOut>(param: EmployeesType): Observable<TOut>{
    return this.http.delete<TOut>(this.apiUrl + '/registryemployeestype/employeestype', this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString({ employeesTypeId: param.id})) )
  }
  /* FINE - call RegistryEmployeesType */

  /* INIZIO - call RegistryRoles */
  getRoleList<TOut>(): Observable<TOut[]> {
    return this.http.get<TOut[]>(this.apiUrl + '/registryroles/roles/search', { })
  }
  
  createRole<TOut>(param: Roles, user: User): Observable<TOut>{
    return this.http.post<TOut>(this.apiUrl + '/registryroles/roles', param, this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString( { userId :user.userId } )   ))
  }

  updateRole<TOut>(param: Roles, user: User): Observable<TOut> {
    return this.http.put<TOut>(this.apiUrl + '/registryroles/roles', param, this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString( {userId:user.userId } )   ))
  }

  deleteRole<TOut>(param: Roles): Observable<TOut> {
    return this.http.delete<TOut>(this.apiUrl + '/registryroles/roles', this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString({ roleId: param.roleId })) )
  }
  /* FINE - call RegistryRoles */

  /* INIZIO - call RegistrySites */
  getSiteList<TOut>(): Observable<TOut[]> {
    return this.http.get<TOut[]>(this.apiUrl + '/registrysites/sites/search', { })
  }

  createSite<TOut>(param: Roles, user: User): Observable<TOut> {
    return this.http.post<TOut>(this.apiUrl + '/registrysites/sites', param, this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString( { userId :user.userId } )   ))
  }

  updateSite<TOut>(param: Sites, user: User): Observable<TOut> {
    return this.http.put<TOut>(this.apiUrl + '/registrysites/sites', param, this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString( {userId:user.userId } )   ))
  }

  deleteSite<TOut>(param: TasksType): Observable<TOut> {
    return this.http.delete<TOut>(this.apiUrl + '/registrysites/sites', this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString({ siteId: param.id})) )
  }
  /* FINE - call RegistrySites */

  /* INIZIO - call RegistryTasks */
  getTasksList<TOut>(): Observable<TOut[]> {
    return this.http.get<TOut[]>(this.apiUrl + '/registrytasks/task/search', { })
  }

  createTask<TOut>(param: RegistryTask, user: User): Observable<TOut> {
    return this.http.post<TOut>(this.apiUrl + '/registrytasks/task', param, this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString( { userId :user.userId } )   ))
  }
  
  deleteTask<TOut>(param: RegistryTask): Observable<TOut> {
    return this.http.delete<TOut>(this.apiUrl + '/registrytasks/task', this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString({ taskId: param.taskId})) )
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

}
