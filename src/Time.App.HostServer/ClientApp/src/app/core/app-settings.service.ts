import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  private settings: AppSettings;
  constructor() { }

  set(value: AppSettings): void {
    this.settings = value; 
  } 
 
  get(key: string): AppSettings[] {
    return this.settings[key]; 
  }  

  commonApiUrl = (): string => `${this.settings.apiEndpoint}common/api`;

  contextSegmentStateApiUrl = (): string => `${this.settings.apiEndpoint}ctx-segment/api`;  

  userConfigurationApiUrl = (): string => `${this.settings.apiEndpoint}configurations/api`;

  wikiUrl = (): string => this.settings.wikiUrl;

  supportUrl = (): string => this.settings.supportUrl;

  apiEndpoint = (): string => this.settings.apiEndpoint;

  authUrl = (): string => this.settings.authUrl;

  returnUrl = (): string => this.settings.returnUrl;

  seqloggingEnabled = (): boolean => this.settings.loggingEnabled

  pricingApiUrl = (): string => `${this.settings.apiEndpoint}pricing/api`; 

  pimApiUrl = (): string => `${this.settings.apiEndpoint}pim/api`; 

  taskUrl = (): string => `${this.settings.apiEndpoint}task-scheduler`;

  eddressIntegApi = (): string => `${this.settings.apiEndpoint}bridge/api`;
  
}

export class AppSettings {
  wikiUrl: string;
  supportUrl: string;
  apiEndpoint:string;
  authUrl: string;
  returnUrl: string;
  imagesRepositoryUrl: string;
  images3dRepositoryUrl: string;
  seqLoggerEndpoint: string;
  loggingEnabled: boolean;
}
