import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
    login : 'https://ems.aladinlabs.com/api/login',
    signup : 'https://ems.aladinlabs.com/api/signup'
  }
  constructor() { }

  set(token){
    localStorage.setItem('token', token.access_token);
    localStorage.setItem('user', JSON.stringify(token.user));
  }

  get(){
    return localStorage.getItem('token');
  }

  getUser(){
    return localStorage.getItem('user');
  }

  remove(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  loggedIn(){
    const token = this.get();
    if(token){
      const check = JSON.parse(atob(token.split('.')[1]));
      if(check){
        return Object.values(this.iss).indexOf(check.iss)>=0?true:false;
      }
      return false;
    }
    return false;
  }
  
}
