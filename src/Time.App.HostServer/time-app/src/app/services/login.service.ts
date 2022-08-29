import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, Observer } from 'rxjs';
import { ClientService } from './client.service';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/users.models';
import { AppSettingsService } from '../core/app-settings.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly apiUrl: string;
  /*
  * Image of user (never used)
  */
  avatar: string
  /*
  * Google User identity
  */
  public identity: gapi.auth2.GoogleUser
  /*
  * User logged
  */
  user: User
  /*
  * Setup of gapi
  */
  gapiSetup : boolean = false
  /*
  * Setup of gapi
  */
  authInstance: gapi.auth2.GoogleAuthBase
  /*
  * helper for decoding token
  */
  private readonly helper = new JwtHelperService()

  constructor(private http: HttpClient,
    private client: ClientService,
    settings: AppSettingsService) {
      this.apiUrl = settings.configurationApiUrl();
  }

  doLogin(): Observable<User> {
    return Observable.create((observer: Observer<User>) => {
      const $r = from(this.authenticate())
      $r.subscribe(
        (user: gapi.auth2.GoogleUser) => {
          this.login(user)
            .subscribe(acc => {
              observer.next(acc)
              observer.complete()
            });
        }
      );
    });
  }

  /*
  * Function for init Authorization of Google
  */
  private async authenticate(): Promise<gapi.auth2.GoogleUser> {
    if (!this.gapiSetup) {
      await this.initGoogleAuth()
    }
    return await this.authInstance.signIn()
  }

  /*
  * Create token user logged 
  */
  login(user: gapi.auth2.GoogleUser): Observable<User> {
    const mail = user.getBasicProfile().getEmail()
    const name = user.getBasicProfile().getName()
    this.avatar = user.getBasicProfile().getImageUrl()
    return this.http.post<any>(this.apiUrl + '/login', { email: mail, name: name }, this.client.buildHttpOptions())
      .pipe(map(r => {
        localStorage.setItem('access_token', r.token)
        return this.mapUser()
      }));
  }

  /*
  * Map google user toker in user Object 
  */
  mapUser(): User {
    const token = localStorage.getItem('access_token')
    const tokenString = token ? token.toString() : ''
    const obj: any = this.helper.decodeToken(tokenString)
    this.user = new User()
    this.user.email = obj.email
    this.user.name = obj.name
    this.user.role = obj.role
    this.user.roleId = obj.roleId
    this.user.jobTitle = obj.jobTitle
    this.user.userId = Number(obj.userId)
    this.user.userKey = obj.userKey
    this.user.isAdmin = this.user.role.toLowerCase() === 'admin'
    this.user.canModifyOverLevel = obj.canModifyOverLevel === 'True' ? true : false
    this.user.canModifySameLevel = obj.canModifySameLevel === 'True' ? true : false
    this.user.canModifyUnderLevel = obj.canModifyUnderLevel === 'True' ? true : false
    this.user.canSeeAndModifyRegistry = obj.canSeeAndModifyRegistry === 'True' ? true : false
    this.user.canSeeOverLevel = obj.canSeeOverLevel === 'True' ? true : false
    this.user.canSeeSameLevel = obj.canSeeSameLevel === 'True' ? true : false
    this.user.canSeeUnderLevel = obj.canSeeUnderLevel === 'True' ? true : false
    this.user.canSeeAndModifyCosts = obj.canSeeAndModifyCosts === 'True' ? true : false
    this.user.canSeeAndModifyInsertControl = obj.canSeeAndModifyInsertControl === 'True' ? true : false
    this.user.level = Number(obj.level)
    return this.user;
  }

  public async initGoogleAuth(): Promise<void> {
    const pload = new Promise((resolve) => {
      gapi.load('auth2', resolve)
    });

    return pload.then(async () => {
      await gapi.auth2
        .init({ client_id: '263903528143-5h3n7fuok0p4ia4dod4ua13hptjv16oo.apps.googleusercontent.com' })
        .then(auth => {
          this.gapiSetup = true
          this.authInstance = auth
        });
    });
  }
}
