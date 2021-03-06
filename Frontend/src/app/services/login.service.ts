import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  LoggedInUsername: string;
  userDetails = null;
  //inject HttpClient
  constructor(private hc: HttpClient) {
  }

  //to user login
  login(userObj): Observable<any> {
    // console.log(userObj);
    return this.hc.post(environment.apiBaseUrl +'/signin', userObj);
  }
  //to user logout
  logout() {
    //remove token from local storage
    localStorage.removeItem('role');
    localStorage.removeItem('_id');
    localStorage.removeItem('signedJwtToken');
    //set user login status to false
    this.isLoggedIn = false;
    this.isAdmin = false;
  }

  setUserDetails(user){
    this.userDetails = user;
    console.log("Inside set user", this.userDetails);
  }

  getUserDetails(){
    console.log(this.userDetails);
    return this.userDetails;
  }

  getUserProfile() {
    return this.hc.get(environment.apiBaseUrl + '/userProfile');
  }
}
