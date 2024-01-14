import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles: []) {
    localStorage.setItem("roles", JSON.stringify(roles));
  }

  public getRoles(): string[] {
    const roles = localStorage.getItem('roles');
    if (roles !== null) {
      return JSON.parse(roles);
    }
    else {
      return [];
    }
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string|null {
    return localStorage.getItem('jwtToken');
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

  public isAdmin() {
    const roles: any[] = this.getRoles();
    return roles[0].roleName === 'Admin';
  }

  public isUser() {
    const roles: any[] = this.getRoles();
    return roles[0].roleName === 'User';
  }



}
