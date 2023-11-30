import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../env/env";
import {HttpClient} from "@angular/common/http";
import {User} from "../../layout/authentication/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.apiHost + 'users')
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(environment.apiHost + 'users/profile/' + id)
  }


  // add(user: User): Observable<User> {
//     headers: {
//       'Content-Type': 'application/json',
//       // Add any other headers if needed
//     }
  //   return this.httpClient.post<User>(environment.apiHost + 'users', user)
  // }


}
