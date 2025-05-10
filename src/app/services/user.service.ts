import { Injectable } from '@angular/core';
import { IUser } from '../pages/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _loggedUser: IUser | null;

  constructor() {}

  get loggedUser(): IUser | null {
    return this._loggedUser;
  }

  set loggedUser(loggedUser: IUser) {
    this._loggedUser = loggedUser;
    window.localStorage.setItem('LU', JSON.stringify(loggedUser));
  }

  getCachedUser() {
    this._loggedUser = JSON.parse(window.localStorage.getItem('LU') as string);
  }
}
