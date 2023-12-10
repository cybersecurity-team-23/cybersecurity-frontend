import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../env/env";
import {HttpClient} from "@angular/common/http";
import {User} from "../../layout/authentication/models/user.model";
import {UserEditRequest} from "../../layout/authentication/models/userEditRequest";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.apiHost + 'users')
  }

  getUser(id: number | undefined): Observable<User> {
    return this.httpClient.get<User>(environment.apiHost + 'users/' + id)
  }

  getByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(environment.apiHost + 'users/email/' + email)
  }

  getProfile(email: string): Observable<User> {
    return this.httpClient.get<User>(environment.apiHost + 'users/profile/' + email)
  }

  update(user: UserEditRequest) {
    return this.httpClient.put<User>(environment.apiHost + 'users/update', user)
      .subscribe();
  }

  changePassword(id: number | undefined, currentPassword: string | undefined, newPassword: string | undefined) {
    const requestBody = {
      currentPassword: currentPassword,
      newPassword: newPassword
    };
    return this.httpClient.put<User>(environment.apiHost + 'users/' + id + '/change-password',requestBody)
  }


  // add(user: User): Observable<User> {
//     headers: {
//       'Content-Type': 'application/json',
//       // Add any other headers if needed
//     }
  //   return this.httpClient.post<User>(environment.apiHost + 'users', user)
  // }


}
