import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userType: string = 'unauthorized';
  constructor() { }

  login(userType: string) {
    this.userType = userType;
  }

  logout() {
    this.userType = 'unauthorized';
  }
  getUserType(): string {
    return this.userType;
  }

  // getUserType(): Observable<string> {
  //   return this.http.get<string>('/api/user-type');
  // }
}

