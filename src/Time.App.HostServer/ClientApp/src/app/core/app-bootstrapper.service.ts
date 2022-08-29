import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppSettings, AppSettingsService } from './app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class AppBootstrapperService {

  constructor(
    private http: HttpClient,
    private settings: AppSettingsService
  ) { }

  async initialize(): Promise<void> {
    try {
      await this.setSettings();
    } catch (error) {
      console.error(error);
    }
    return Promise.resolve();
  }

  private async setSettings(): Promise<void> {
    
    const data = await this.http
      .get<AppSettings>(environment.appSettingsPath)
      .toPromise();

    this.settings.set(data);

    const conf = await this.http.get<AppSettings[]>(this.settings.commonApiUrl() + '/query/app.SCONF/list')
      .pipe(map(x => x[0]))
      .toPromise();
    return;
  }
}