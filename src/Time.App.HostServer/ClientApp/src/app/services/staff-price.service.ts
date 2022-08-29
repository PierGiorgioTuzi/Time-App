import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../globals';
import { StaffPrice } from '../models/employees-yearly-cost.models';
import { PaginatedResponse } from '../models/paginated-response.model';
import { User } from '../models/user.models';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class StaffPriceService {

  constructor(
    private http: HttpClient,
    private clientService: ClientService
  ) { }

  /* INIZIO - call CostItemTypes */
  getCostItemTypesList<TOut>(page:number, pageSize: number): Observable<PaginatedResponse<TOut>> {
    return this.http.get<PaginatedResponse<TOut>>(apiUrl + '/costitemtypes/search', this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString({ page:page, pageSize: pageSize})))
  }
  /* FINE - call CostItemTypes */

  /* INIZIO - call EmployeeYearlyCosts */
  getStaffPriceList<TOut>(filter: any): Observable<TOut> {
    return this.http.get<TOut>(apiUrl + '/eycos/search', this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString(filter)))
  }

  updateStaffPrice<TOut>(param: StaffPrice, user: User): Observable<TOut> {
    return this.http.put<TOut>(apiUrl + '/eycos', param, this.clientService.buildHttpOptionsWithHttpParams(this.clientService.buildQueryString({ userId: user.userId })))
  }

  uploadExcel<TOut>(year: number, file: any, user: User): Observable<TOut> {
    const data: FormData = new FormData();
    data.append('file', file, file.name);
    return this.http.post<TOut>(apiUrl + '/import-excel', data, this.clientService.buildHttpOptionsWithHttpFormData(this.clientService.buildQueryString({ year: year, user: user.userId })))
  }
 /* FINE - call EmployeeYearlyCosts */


}
