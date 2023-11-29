import {Host, Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {environment} from "../../../env/env";
import {Admin} from "../models/admin.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userType: string = 'unauthorized';
  private user!: User;
  constructor(private httpClient: HttpClient) { }

  login(userType: string) {
    this.userType = userType;
  }

  validateUser(email: string, password: string):Observable<User>{
    const body = {email: email, password: password};
    // @ts-ignore
    return this.httpClient.post<ArrayBuffer>(`${environment.apiHost}users/login`, body);
  }

  getAdmin(id: number):Observable<Admin>{
    return this.httpClient.get<Admin>(environment.apiHost+'admin/'+id.toString())
  }

  getHost(id: number):Observable<Host>{
    return this.httpClient.get<Host>(environment.apiHost+'hosts/'+id.toString())
  }

  checkUserType(id: number): Observable<string> {
    return new Observable<string>(observer => {
      // Check if the user is an admin
      this.getAdmin(id).subscribe({
        next: (_) => {
          observer.next('admin');
          observer.complete();
        },
        error: (_) => {
          // Admin check failed, proceed to the next check
          this.getHost(id).subscribe({
            next: (_) => {
              observer.next('host');
              observer.complete();
            },
            error: (_) => {
              // Both admin and host checks failed, user is a guest
              observer.next('guest');
              observer.complete();
            }
          });
        }
      });
    });
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

