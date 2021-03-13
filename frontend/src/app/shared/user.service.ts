import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  //HttpMethods

  postUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/register', user, this.noAuthHeader);
  }

  login(authCredentials) {
    console.log('user service login', authCredentials)
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Basic ${this.getToken()}`)
    }
    return this.http.get(environment.apiBaseUrl + '/userProfile'+'/?userId=abcd@gmail.com',header);
  }


  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('loggedin-token', token);
  }

  getToken() {
    return localStorage.getItem('loggedin-token');
  }

  deleteToken() {
    localStorage.removeItem('loggedin-token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
