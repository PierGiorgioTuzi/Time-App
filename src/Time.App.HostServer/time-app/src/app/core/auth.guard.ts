import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppSettingsService } from './app-settings.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private user: UserService,
    private jwtHelper: JwtHelperService,
    private settings: AppSettingsService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.user.get();
    if (currentUser) {
      return true;
    }

    const token = this.GetToken(next);
    if (!token) {
      this.goToLogin();
      return false;
    }
    if (this.jwtHelper.isTokenExpired(token)) {
      this.goToLogin();
      return false;
    }
    localStorage.setItem('ri-token', token);
    this.user.set(this.jwtHelper.decodeToken(token));
  /*   if (next.queryParams.returnUrl)
      window.location.href = next.queryParams.returnUrl; */
    return true;
  }

  goToLogin(): void {
    const url = this.settings.authUrl() + '?app=PIM&returnUrl=' + encodeURI(window.location.href);
    window.location.href = url;
  }

  private GetToken(route: ActivatedRouteSnapshot, state?: RouterStateSnapshot): string {
    const search = window.location.search;
    if (route.queryParams.hasOwnProperty('auth')){
     /*  return route.queryParams.auth; */
    }
    else if (search) {
      let token :string
      search.slice(1).split('&').forEach(_ => {
        if(_.includes('auth')){
          token = _.split('=')[1]
      }})
      return token ? token : localStorage.getItem('ri-token');
    }
    return localStorage.getItem('ri-token');
  }
}