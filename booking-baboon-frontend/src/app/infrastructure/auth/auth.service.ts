import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {AuthResponse} from "./model/auth-response.model";
import {JwtHelperService} from "@auth0/angular-jwt";
import {environment} from "../../env/env";
import {Login} from "./model/login.model";
import {User} from "../../layout/authentication/models/user.model";
import {Host} from "../../layout/authentication/models/host.model";
import {Guest} from "../../layout/authentication/models/guest.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  user$ = new BehaviorSubject("");
  userState = this.user$.asObservable();

  constructor(private http: HttpClient) {
    this.user$.next(this.getRole());
  }

  login(auth: Login): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.apiHost + 'users/login', auth, {
      headers: this.headers,
    });
  }

  logout(): Observable<string> {
    return this.http.get(environment.apiHost + 'users/logout', {
      responseType: 'text',
    });
  }

  getRole(): any {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      return helper.decodeToken(accessToken).role[0].authority;
    }
    return null;
  }

  getId(): number | undefined{
    if(this.isLoggedIn()){
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      return +helper.decodeToken(accessToken)["id"];
    }
    return undefined;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') != null;
  }

  setUser(): void {
    this.user$.next(this.getRole());
  }

  registerHost(user: Host): Observable<Host> {
    return this.http.post<Host>(environment.apiHost+'hosts/',user)
  }

  registerGuest(user: Guest): Observable<Guest> {
    return this.http.post<Guest>(environment.apiHost+'guests/',user)
  }

  getUser() {
    return this.user$;
  }
}
