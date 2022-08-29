import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface Organization {
  Code?: string;
  Description?: string;
}

export interface MetaUserType {
  Code?: string;
  Description?: string;
}

export interface MetaUserArea {
  Code?: string;
  Description?: string;
}

export interface MetaUser {
  Code?: string;
  Description?: string;
  Organization?: Organization;
  MetaUserType?: MetaUserType;
  MetaUserArea?: MetaUserArea;
}

export interface Role {
  Code?: string;
  Description?: string;
  ShortDescription?: string;
  ActionControl?: boolean;
}

export interface User {
  Code?: string;
  Name?: string;
  Surname?: string;
  Fullname?: string;
  MetaUser?: MetaUser;
  Roles?: Role[];
}

export interface UserAuth {
  sub: string;
  jti: string;
  username: string;
  displayname: string;
  exp: number;
  iss: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private user: UserAuth;

  constructor() { }

  set(user: UserAuth): void {
    this.user = user;
  }

  get = (): UserAuth => this.user;

  forceAdminUser(): void {
    const user = {
      sub: '',
      jti: '',
      username: 'admin',
      displayname: 'admin',
      iss: '',
      exp: new Date().getMilliseconds(),
      user: {
        Code: 'admin',
        MetaUser: {
          Organization: {
            Code: 'HQ',
            Description: 'CENTRALE'
          }
        }
      }
    } as UserAuth;
    this.user = user;
  }

}