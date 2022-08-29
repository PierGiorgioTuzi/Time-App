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

  configurationApiUrl = (): string => `${this.settings.apiEndpoint}`;

  authUrl = (): string => `${this.settings.authUrl}`;
 

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