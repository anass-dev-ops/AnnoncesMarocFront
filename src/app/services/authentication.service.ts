import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  host = 'http://localhost:8080';
  roles; jwt;

  constructor(private http: HttpClient) { }
  login(user) {
    return this.http.post(this.host + '/login', user, {observe: 'response'});
  }
  saveToken(jwt: string) {
    this.jwt = jwt;
    localStorage.setItem('token', jwt);
  }
  loadToken(): string {
    this.jwt = localStorage.getItem('token')
    return this.jwt;
  }
  deleteToken() {
    this.jwt = null;
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    if (this.loadToken() === null) {
      return false;
    } else {
      return true;
    }
  }
  isAdmin() {
    const jwt = this.loadToken();
    if (jwt !== null) {
      const jwtHelper = new JwtHelperService();
      this.roles = jwtHelper.decodeToken(jwt).roles;
      for (const r of this.roles) {
        if (r.authority === 'ADMIN') {
          return true;
        }
      }
      return false;
    } else {
      return null;
    }
  }

  register(newUser) {
    return this.http.post(this.host + '/register', newUser);
  }

  getUsername(): string {
    const jwt = this.loadToken();
    const jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(jwt).sub;
  }

  getUserByUserName(username: string) {
    username = this.getUsername();
    return this.http.get(this.host + '/users/' + username);
  }
}
