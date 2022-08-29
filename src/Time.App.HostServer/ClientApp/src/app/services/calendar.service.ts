import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SidebarFilter } from '../common/enum/sidebar.enum';
import { apiUrl } from '../globals';
import { PersonalFilter } from '../models/general.models';
import { JiraCalendarEventBackEnd, JiraFormBackEnd } from '../models/jira.models';
import { PaginatedResponse } from '../models/paginated-response.model';
import { User } from '../models/user.models';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(
    private http: HttpClient,
    private clientService: ClientService
  ) { }

  /* INIZIO - call AgendaType */
  getAgendaTypeList<TOut>(page:number, pageSize: number): Observable<PaginatedResponse<TOut>>{
    return this.http.get<PaginatedResponse<TOut>>(apiUrl + '/agendaType/search', this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString({ page:page, pageSize: pageSize})))
  }
 /* FINE - call AgendaType */

  /* INIZIO - call Employees */
  getEmployerList<TOut>(page:number, pageSize: number): Observable<PaginatedResponse<TOut>> {
    return this.http.get<PaginatedResponse<TOut>>(apiUrl + '/employees/search', this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString({ page:page, pageSize: pageSize})))
  }
  /* FINE - call Employees */

  /* INIZIO - call EmployeesAgenda */
  getTaskPersonalList<TOut>(filter: PersonalFilter): Observable<TOut> {
    return this.http.get<TOut>(apiUrl + '/employeesagenda/search', this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString(filter)))
  }

  createEventFromSidebar<TOut>(param: JiraFormBackEnd, user: User, createWeekend: boolean ): Observable<TOut> {
    return this.http.post<TOut>(apiUrl + '/employeesagenda', param, this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString( {userId:user.userId,  createWeekend: createWeekend } )  ))
  }

  updateEventFromCalendar<TOut>(param: JiraCalendarEventBackEnd, user: User, createWeekend: boolean): Observable<TOut> {
    return this.http.put<TOut>(apiUrl + '/employeesagenda', param, this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString( {userId:user.userId,  createWeekend: createWeekend } )   ))
  }

  deleteEventFromCalendar<TOut>(param: any): Observable<TOut> {
    return this.http.delete<TOut>(apiUrl + '/employeesagenda', this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString(param)))
  }
  /* FINE - call EmployeesAgenda */

  /* INIZIO - call Project */
  getProjectList<TOut>(): Observable<any>  {
    return this.http.get<TOut>(apiUrl + '/project/search', { })
  }
  /* FINE - call Project */

  /* INIZIO - call Sites, Status, Task, User */
  getSiteList<TOut>(): Observable<TOut> {
    return this.http.get<TOut>(apiUrl + '/sites/search', { })
  }

  getStatusList<TOut>(): Observable<TOut> {
    return this.http.get<TOut>(apiUrl + '/status/search', { })
  }
 
  getTaskList<TOut>(filter: SidebarFilter): Observable<TOut> {
    return this.http.get<TOut>(apiUrl + '/task/search', this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString(filter)))
  }
 
  getUsersList<TOut>(): Observable<TOut>{
    return this.http.get<TOut>(apiUrl + '/user/search', { })
  }
  /* FINE - call Sites, Status, Task, User */








}
