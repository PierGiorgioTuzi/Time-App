import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  buildHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept-Language': 'it',
        'Access-Control-Allow-Origin': '/'
      })
    };
  }


  buildQueryString(param: { [s: string]: any }): HttpParams {
    let httpParams = new HttpParams();
    for (const prop in param) {
      if (!!param[prop] && param[prop].constructor === Array) {
        for (const propValue of param[prop]) {
          httpParams = httpParams.append(prop, String(propValue));
        }
      } else {
        if (Object.prototype.hasOwnProperty.call(param, prop)) {
          httpParams = httpParams.append(prop, String(param[prop]));
        }
      }
    }
    return httpParams;
  }


  buildHttpOptionsWithHttpParams(params: HttpParams): { params: HttpParams, headers: HttpHeaders, body?: any} {
    return {
      params: params,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-USER': 'admin',
        'Accept-Language': "en",
        "Access-Control-Allow-Origin": "*"
      })
    };
  }

  buildHttpOptionsWithHttpFormData(params: HttpParams): { params: HttpParams, headers: HttpHeaders, body?: any } {
    return {
      params: params,
      headers: new HttpHeaders({
        'X-USER': 'admin',
        'Accept-Language': "en",
        "Access-Control-Allow-Origin": "*"
      })
    };
  }

  buildHttpOptionsWithHttpParamsAndBody(params: HttpParams, body?: any): { params: HttpParams, headers: HttpHeaders, body?: any } {
    return {
      params: params,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-USER': 'admin',
        'Accept-Language': "en",
        "Access-Control-Allow-Origin": "*"
      }),
      body: body
    };
  }

  
}
