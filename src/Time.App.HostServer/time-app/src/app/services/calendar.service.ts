import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SidebarFilter } from '../common/enum/sidebar.enum';
import { AppSettingsService } from '../core/app-settings.service';
import { PersonalFilter } from '../models/general.models';
import { InsertControlList } from '../models/insert-control.models';
import { JiraCalendarEventBackEnd, JiraFormBackEnd } from '../models/jira.models';
import { User } from '../models/user.models';
import { BaseClient } from './base-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private readonly apiUrl: string;

  constructor(
    private client: BaseClient,
    private http: HttpClient,
    private settings: AppSettingsService,
  ) { 
    this.apiUrl = settings.configurationApiUrl();
  }
  /* INIZIO - call AgendaType */
  getAgendaTypeList<TOut>(): Observable<any>{
    return this.http.get<TOut>(this.apiUrl + '/agendaType/search', { })
  }
 /* FINE - call AgendaType */

  /* INIZIO - call EmployeesAgenda */

  getInsertControlList<TOut>(filter: InsertControlList): Observable<TOut[]>  {
    return this.http.get<TOut[]>(this.apiUrl + '/employeesagenda/dailyhours', this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString(filter)))
  }
  getTaskPersonalList<TOut>(filter: PersonalFilter): Observable<TOut> {
    return this.http.get<TOut>(this.apiUrl + '/employeesagenda/search', this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString(filter)))
  }

  createEventFromSidebar<TOut>(param: JiraFormBackEnd, user: User, createWeekend: boolean ): Observable<TOut> {
    return this.http.post<TOut>(this.apiUrl + '/employeesagenda', param, this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString( {userId:user.userId,  createWeekend: createWeekend } )  ))
  }

  updateEventFromCalendar<TOut>(param: JiraCalendarEventBackEnd, user: User, createWeekend: boolean): Observable<TOut> {
    return this.http.put<TOut>(this.apiUrl + '/employeesagenda', param, this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString( {userId:user.userId,  createWeekend: createWeekend } )   ))
  }

  deleteEventFromCalendar<TOut>(param: any): Observable<TOut> {
    return this.http.delete<TOut>(this.apiUrl + '/employeesagenda', this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString(param)))
  }
  /* FINE - call EmployeesAgenda */

  /* INIZIO - call Project */
  getProjectList<TOut>(): Observable<any>  {
    return this.http.get<TOut>(this.apiUrl + '/project/search', { })
  }
  /* FINE - call Project */

  /* INIZIO - call Sites, Status, Task, User */
  getSiteList<TOut>(): Observable<TOut> {
    return this.http.get<TOut>(this.apiUrl + '/sites/search', { })
  }

  getStatusList<TOut>(): Observable<TOut> {
    return this.http.get<TOut>(this.apiUrl + '/status/search', { })
  }
 
  getTaskList<TOut>(filter: SidebarFilter): Observable<TOut> {
    return this.http.get<TOut>(this.apiUrl + '/task/search', this.client.buildHttpOptionsWithHttpParams(this.client.buildQueryString(filter)))
  }
 
  getUsersList<TOut>(): Observable<TOut>{
    return this.http.get<TOut>(this.apiUrl + '/user/search', { })
  }
  /* FINE - call Sites, Status, Task, User */

}
