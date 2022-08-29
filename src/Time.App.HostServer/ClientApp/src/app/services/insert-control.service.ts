import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../globals';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class InsertControlService {

  constructor(
    private http: HttpClient,
    private clientService: ClientService
  ) { }

  
  getInsertControlList<TOut>(filter: any): Observable<TOut[]>  {
    return this.http.get<TOut[]>(apiUrl + '/employeesagenda/dailyhours', this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString(filter)))
  }


}
